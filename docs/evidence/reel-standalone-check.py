import hashlib
import json
import subprocess
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parent.parent
project = root / 'outputs/forme'
folder = root / 'work/reel-package'
folder.mkdir(exist_ok=True)
package = project / 'public/downloads/cinema.zip'
with zipfile.ZipFile(package) as archive:
    assert archive.testzip() is None
    assert all((folder / name).resolve().is_relative_to(folder.resolve()) for name in archive.namelist())
    archive.extractall(folder)
    for name in ['Template.tsx', 'Scene.tsx', 'content.ts', 'theme.css']:
        assert archive.read('app/kits/cinema/' + name) == (project / 'src/kits/cinema' / name).read_bytes()
    config = json.loads(archive.read('package.json'))
    source = json.loads((project / 'package.json').read_text())
    assert config['dependencies']['three'] == source['dependencies']['three']
    assert config['devDependencies']['@types/three'] == source['devDependencies']['@types/three']
    assert archive.read('public/assets/reel-grain.png') == (project / 'public/assets/reel-grain.png').read_bytes()
report = {'checkedAt': __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat(), 'slug':'cinema', 'sha256':hashlib.sha256(package.read_bytes()).hexdigest(), 'sourceBytesMatch':True, 'dependenciesMatch':True}
for phase,args in [('install',['install','--no-audit','--no-fund','--prefer-offline']),('build',['run','build'])]:
    with (folder / (phase+'.log')).open('w',encoding='utf-8') as log:
        result = subprocess.run(['cmd.exe','/d','/c','npm.cmd',*args],cwd=folder,stdout=log,stderr=subprocess.STDOUT)
    report[phase] = result.returncode
    print(phase+': '+str(result.returncode),flush=True)
    if result.returncode:
        break
(root / 'work/reel-standalone.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
raise SystemExit(0 if report.get('build') == 0 else 1)
