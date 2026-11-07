"use client";
import { useEffect, useState } from "react";
import { DownloadSimple } from "@phosphor-icons/react";
import { site } from "@/config/site";
import { templates } from "@/content/templates";
type Feedback = { template: string; message: string; createdAt: string };
export function FeedbackForm() {
  const [saved, setSaved] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const [template, setTemplate] = useState("platform");
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(site.storage.feedback);
      if (!raw) return;
      const previous = JSON.parse(raw);
      if (typeof previous.message !== "string" || typeof previous.createdAt !== "string" || !["platform", ...templates.map(item => item.slug)].includes(previous.template)) throw new Error("Invalid feedback");
      setTemplate(previous.template); setMessage(previous.message); setSaved(previous);
    } catch { setError("暂时无法读取已保存的反馈，可以重新填写并导出文件。"); }
  }, []);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) { setError("请写下您的反馈，再保存。"); return; }
    const feedback = { template, message: message.trim(), createdAt: new Date().toISOString() };
    setError("");
    try { localStorage.setItem(site.storage.feedback, JSON.stringify(feedback)); setSaved(feedback); } catch { setSaved(feedback); setError("浏览器未允许本地保存，请导出文件保留反馈。"); }
  }
  function download() {
    if (!saved) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(saved, null, 2)], { type: "application/json;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "forme-feedback.json"; anchor.click(); URL.revokeObjectURL(url);
  }
  return <form className="feedback-form" onSubmit={submit}><label className="form-field"><span>您想反馈哪一部分？</span><select name="template" value={template} onChange={event => { setTemplate(event.target.value); setSaved(null); setError(""); }}><option value="platform">形集网站</option>{templates.map(item => <option key={item.slug} value={item.slug}>{item.name}模板</option>)}</select></label><label className="form-field"><span>具体反馈</span><textarea name="message" required maxLength={3000} value={message} placeholder="哪里好用、哪里走样了，或者您希望看到什么样的模板？" onChange={event => { setMessage(event.target.value); setSaved(null); setError(""); }} /></label><p className="feedback-note">当前为本地演示。反馈仅保存到当前浏览器，尚未发送给维护者；您可以导出文件自行分享。</p><div className="form-actions"><button className="button button-dark" type="submit">保存到本地</button></div>{error && <p className="notice" role="alert">{error}</p>}{saved && <div className="success-panel" role="status"><h2>反馈已整理好</h2><p>{error ? "请导出文件保存。" : "已保存在当前浏览器，未发送到服务器。"}</p><button type="button" className="button button-light" onClick={download}><DownloadSimple size={18} />导出反馈文件</button></div>}</form>;
}
