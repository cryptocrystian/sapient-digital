"use client";
import {useState} from "react";
import styles from "./contact-form.module.css";
export default function ContactForm(){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [company,setCompany]=useState("");const [interest,setInterest]=useState("Integrated Authority Program");const [details,setDetails]=useState("");
 const subject=encodeURIComponent("Sapient Digital strategy inquiry — "+interest);
 const body=encodeURIComponent("Name: "+name+"\nWork email: "+email+"\nCompany: "+company+"\nInterested in: "+interest+"\n\nBusiness challenge:\n"+details);
 return <section className={styles.section} id="inquiry" aria-labelledby="inquiry-title"><div><p className={styles.eyebrow}>START A CONVERSATION / NO COMMITMENT</p><h2 id="inquiry-title">Tell us what you're working toward.</h2><p className={styles.note}>This form opens an email draft addressed to Sapient Digital. It does not send your information to a server or subscribe you to marketing.</p></div>
 <form className={styles.form} action="mailto:hello@sapientdigital.io" method="get" onSubmit={(e)=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;window.location.href="mailto:hello@sapientdigital.io?subject="+subject+"&body="+body}}>
 <label>Full name<input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="Your name"/></label>
 <label>Work email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" placeholder="you@company.com"/></label>
 <label>Company<input required value={company} onChange={e=>setCompany(e.target.value)} autoComplete="organization" placeholder="Company name"/></label>
 <label>What do you need?<select value={interest} onChange={e=>setInterest(e.target.value)}><option>Integrated Authority Program</option><option>Digital PR</option><option>Strategic Content</option><option>Search & AI Visibility</option><option>Not sure yet</option></select></label>
 <label className={styles.wide}>Tell us about your priorities<textarea required value={details} onChange={e=>setDetails(e.target.value)} rows={5} placeholder="What would a stronger market position look like for your team?"/></label>
 <button type="submit">Open email draft ↗</button><small>Your email app must be configured for this action to work. You can also email hello@sapientdigital.io directly.</small>
 </form></section>
}