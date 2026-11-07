import hashlib
import json
import subprocess
import zipfile
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

root = Path(__file__).resolve().parents[1]
project = root / 'outputs/forme'

def verify(slug):
    folder = root / 'work/duo-packages' / slug
    folder.mkdir(parents=True, exist_ok=True)
    package = project / 'public/downloads' / (slug+'.zip')
    with zipfile.ZipFile(package) as archive:
        assert archive.testzip() is None
        assert all((folder/name).resolve().is_relative_to(folder.resolve()) for name in archive.namelist())
        archive.extractall(folder)
        for file in (project/'src/kits'/slug).iterdir():
            if file.suffix in ['.ts','.tsx','.css']:
                assert archive.read('app/kits/'+slug+'/'+file.name)==file.read_bytes()
        config=json.loads(archive.read('package.json'))
        declaration=project/'src/kits'/slug/'dependencies.json'
        extra=json.loads(declaration.read_text(encoding='utf-8')) if declaration.exists() else {}
        root_package=json.loads((project/'package.json').read_text(encoding='utf-8'))
        assert set(config['dependencies'])=={'next','react','react-dom',*extra.get('dependencies',[])}
        for section,names in extra.items():
            for name in names:
                assert config[section][name]==root_package[section][name]
    report={'slug':slug,'checkedAt':datetime.now(timezone.utc).isoformat(),'sha256':hashlib.sha256(package.read_bytes()).hexdigest(),'sourceBytesMatch':True,'declaredDependenciesMatch':True}
    for phase,args in [('install',['install','--no-audit','--no-fund','--prefer-offline']),('build',['run','build'])]:
        with (folder/(phase+'.log')).open('w',encoding='utf-8') as log:
            result=subprocess.run(['cmd.exe','/d','/c','npm.cmd',*args],cwd=folder,stdout=log,stderr=subprocess.STDOUT)
        report[phase]=result.returncode
        print(f'{slug} {phase}: {result.returncode}',flush=True)
        if result.returncode:
            break
    return report

with ThreadPoolExecutor(max_workers=2) as pool:
    reports=list(pool.map(verify,['doodle','depth']))
(root/'work/duo-standalone.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
print(json.dumps(reports,indent=2))
raise SystemExit(0 if all(x.get('build')==0 for x in reports) else 1)
