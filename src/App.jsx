import { useState, useEffect, useRef } from 'react';
import './App.css';

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = {
  Menu:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Grid:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Sparkle:    (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/></svg>,
  Overview:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Datasource: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Detection:  (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Settings:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Shield:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Triangle:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>,
  Eye:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Search2:    (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Wrench:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Tasks:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><rect x="2" y="4" width="20" height="16" rx="2" fill="none"/></svg>,
  Book:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Chart:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="3 9 9 9 9 21"/><polyline points="9 3 9 9 21 9"/></svg>,
  Box:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  External:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  ChevDown:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Search:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  SortAsc:    (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 5 19 12"/></svg>,
  Grip:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></svg>,
  Pause:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  X:          (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Bot:        (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><rect x="8" y="7" width="8" height="1" rx=".5"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/><circle cx="12" cy="4" r="2"/></svg>,
  Send:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Clock:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  AlertCircle:(p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const TASKS_INIT = [
  {
    id: 1, queue: 1, status: 'needs_input',
    title: 'Verify a suspicious PowerShell execution on a Host-A',
    subtitle: 'Part of Case #492 (Ransomware investigation path)',
    agent: 'Agent 7', duration: '7.2m', canReview: true,
    reviewData: {
      agentName: 'Agent 7',
      taskTitle: 'Verify Suspicious PowerShell execution on Host-A',
      taskSubtitle: 'Part of Case #492 (Ransomware investigation path)',
      analysis: "I am investigating a complex encoded PowerShell command. Based on my analysis, this looks 80% malicious, but it matches a pattern sometimes used by your 'Sysadmin-Tools' deployment server.\n\nQuestion: Is the IP address 10.5.2.20 a known legitimate deployment server, or should I proceed with escalation as a potential breach?",
      evidence: `powershell.exe -EncodedCommand\nSQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0AC\nB0AC...\nDecoded: Invoke-WebRequest -Uri\nhttp://10.5.2.20:8443/deploy/update.ps1 -\nOutFile C:\\Temp\\update.ps1\nSource Host: WORKSTATION-447\nUser: admin_jsmith\nTimestamp: 2024-12-15T14:32:07Z`,
      quickActions: ['Mark IP as legitimate & whitelist', 'Confirm escalation as breach'],
    },
  },
  {
    id: 2, queue: 2, status: 'thinking',
    title: 'Correlating user behavior across VPN and O365 logs',
    subtitle: 'Anomalous login pattern detected for user cthomas',
    agent: 'Agent 3', duration: '3.9m', canReview: false,
  },
  {
    id: 3, queue: 3, status: 'working',
    title: 'Researching new threat intel related to CVE-2024-38077',
    subtitle: 'Windows Remote Desktop Licensing Service RCE',
    agent: 'Agent 3', duration: '3.9m', canReview: false,
  },
  {
    id: 4, queue: 4, status: 'needs_input',
    title: 'Investigating log gap from Firewall-Z',
    subtitle: 'No logs received since 12:45 UTC — correlating with NOC tickets',
    agent: 'Agent 7', duration: '7.2m', canReview: true,
    reviewData: {
      agentName: 'Agent 7',
      taskTitle: 'Investigating log gap from Firewall-Z',
      taskSubtitle: 'No logs received since 12:45 UTC — correlating with NOC tickets',
      analysis: "Firewall-Z has had a log gap of 47 minutes starting at 12:45 UTC. I've correlated with NOC tickets and found ticket #8821 which mentions 'maintenance window' but this wasn't pre-authorized in our change management system.\n\nQuestion: Was this an approved maintenance window, or should I treat this as a potential log tampering/evasion incident?",
      evidence: `Firewall-Z log timeline:\n  Last log: 2024-12-15T12:45:02Z\n  Log resume: 2024-12-15T13:32:18Z\n  Gap duration: 47m 16s\n\nNOC Ticket #8821: "FW-Z maintenance"\n  Created: 12:43 UTC (2 min before gap)\n  Author: noc-user-7\n  Change mgmt ref: NONE`,
      quickActions: ['Mark as approved maintenance', 'Escalate as potential evasion'],
    },
  },
  {
    id: 5, queue: 5, status: 'working',
    title: 'Routine False Positive scan on Rule ID 992',
    subtitle: 'Scheduled review — rule has 34% benign close rate',
    agent: 'Agent 3', duration: '3.9m', canReview: false,
  },
  {
    id: 6, queue: 6, status: 'working',
    title: 'Link related cases #488 and #491',
    subtitle: 'Both cases share IOC: hash a3f2b7..., same subnet',
    agent: 'Agent 3', duration: '3.9m', canReview: false,
  },
  {
    id: 7, queue: 7, status: 'queued',
    title: 'Routine False Positive scan on Rule ID 992',
    subtitle: 'Scheduled review — rule has 34% benign close rate',
    agent: 'Agent 3', duration: '3.9m', canReview: false,
  },
  {
    id: 8, queue: 8, status: 'queued',
    title: 'Unusual outbound traffic from DB-Server-03',
    subtitle: 'Case #501 — Potential data exfiltration via DNS tunneling',
    agent: 'Agent 7', duration: '7.2m', canReview: true,
    reviewData: {
      agentName: 'Agent 7',
      taskTitle: 'Unusual outbound traffic from DB-Server-03',
      taskSubtitle: 'Case #501 — Potential data exfiltration via DNS tunneling',
      analysis: "DB-Server-03 is generating unusually high DNS query volumes with long subdomains matching DNS tunneling patterns (avg subdomain length: 52 chars, 340 req/min vs baseline of 12 req/min).\n\nI've identified the destination: *.exfil-domain.net — not in our allow list. This matches known data exfiltration via DNS tunneling techniques.\n\nShould I block the DNS queries and isolate DB-Server-03?",
      evidence: `DNS Query Pattern (last 10 min):\n  Rate: 340 req/min (baseline: 12)\n  Avg subdomain len: 52 chars\n  Destination: *.exfil-domain.net\n  \nSample queries:\n  dGhpcyBpcyBzZW5zaXRpdmUgZGF0YQ.exfil-domain.net\n  aW50ZXJuYWwgc2VjcmV0IGtleXM.exfil-domain.net\n  \nSource: DB-Server-03 (10.0.2.45)\nTime: 2024-12-15T13:51:00Z`,
      quickActions: ['Block DNS & isolate server', 'Continue monitoring only'],
    },
  },
];

// ─── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS = {
  needs_input: {
    label: 'Needs input',
    icon: () => <Icon.AlertCircle style={{width:13,height:13,flexShrink:0}} />,
    cls: 'text-red-400',
    dot: 'bg-red-400',
  },
  thinking: {
    label: 'Thinking...',
    icon: () => (
      <svg style={{width:13,height:13,flexShrink:0,animation:'spin 1.4s linear infinite'}} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="20 60" strokeLinecap="round"/>
      </svg>
    ),
    cls: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  working: {
    label: 'Working...',
    icon: () => (
      <svg style={{width:13,height:13,flexShrink:0,animation:'spin 1s linear infinite'}} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" strokeDasharray="30 50" strokeLinecap="round"/>
      </svg>
    ),
    cls: 'text-green-400',
    dot: 'bg-green-400',
  },
  queued: {
    label: 'Queued',
    icon: () => <Icon.Clock style={{width:13,height:13,flexShrink:0}} />,
    cls: 'text-slate-400',
    dot: 'bg-slate-400',
  },
  paused: {
    label: 'Paused',
    icon: () => <Icon.Pause style={{width:13,height:13,flexShrink:0}} />,
    cls: 'text-slate-400',
    dot: 'bg-slate-400',
  },
};

// ─── DATABRICKS LOGO ──────────────────────────────────────────────────────────
const DatabricksLogo = () => (
  <svg width="110" height="17" viewBox="0 0 105 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_db)">
      <path d="M14.0035 6.58407L7.40531 10.308L0.339823 6.3292L0 6.51327V9.40177L7.40531 13.5646L14.0035 9.85487V11.3841L7.40531 15.108L0.339823 11.1292L0 11.3133V11.8088L7.40531 15.9717L14.7965 11.8088V8.92035L14.4566 8.73628L7.40531 12.7009L0.79292 8.99115V7.46195L7.40531 11.1717L14.7965 7.00885V4.16283L14.4283 3.95044L7.40531 7.90089L1.13274 4.38938L7.40531 0.863717L12.5593 3.76637L13.0124 3.5115V3.15752L7.40531 0L0 4.16283V4.61593L7.40531 8.77876L14.0035 5.05487V6.58407Z" fill="#FF3621"/>
      <path d="M32.1982 14.2231V1.50806H30.2442V6.26558C30.2442 6.33637 30.2017 6.39301 30.1309 6.42133C30.0601 6.44965 29.9893 6.42133 29.9468 6.37885C29.2813 5.60009 28.2477 5.16115 27.115 5.16115C24.6937 5.16115 22.7964 7.20009 22.7964 9.8054C22.7964 11.0797 23.2353 12.255 24.0424 13.1187C24.8495 13.9824 25.9397 14.4496 27.115 14.4496C28.2336 14.4496 29.2672 13.9824 29.9468 13.1753C29.9893 13.1187 30.0743 13.1045 30.1309 13.1187C30.2017 13.147 30.2442 13.2036 30.2442 13.2744V14.2231H32.1982ZM27.5397 12.6797C25.9822 12.6797 24.7645 11.4196 24.7645 9.8054C24.7645 8.19124 25.9822 6.93107 27.5397 6.93107C29.0973 6.93107 30.315 8.19124 30.315 9.8054C30.315 11.4196 29.0973 12.6797 27.5397 12.6797Z" fill="#E4ECF1"/>
      <path d="M42.6479 14.2089V5.37352H40.708V6.26556C40.708 6.33635 40.6656 6.39299 40.5948 6.42131C40.524 6.44963 40.4532 6.42131 40.4107 6.36467C39.7594 5.58591 38.7399 5.14697 37.5788 5.14697C35.1576 5.14697 33.2603 7.18591 33.2603 9.79122C33.2603 12.3965 35.1576 14.4355 37.5788 14.4355C38.6974 14.4355 39.7311 13.9682 40.4107 13.147C40.4532 13.0903 40.5381 13.0762 40.5948 13.0903C40.6656 13.1187 40.708 13.1753 40.708 13.2461V14.2089H42.6479ZM38.0178 12.6797C36.4603 12.6797 35.2426 11.4195 35.2426 9.80538C35.2426 8.19122 36.4603 6.93104 38.0178 6.93104C39.5753 6.93104 40.793 8.19122 40.793 9.80538C40.793 11.4195 39.5753 12.6797 38.0178 12.6797Z" fill="#E4ECF1"/>
      <path d="M59.2567 14.2231V5.37352H57.3169V6.26556C57.3169 6.33635 57.2744 6.39299 57.2037 6.42131C57.1329 6.44963 57.0621 6.42131 57.0196 6.36467C56.3683 5.58591 55.3488 5.14697 54.1877 5.14697C51.7523 5.14697 49.8691 7.18591 49.8691 9.80538C49.8691 12.4248 51.7665 14.4496 54.1877 14.4496C55.3063 14.4496 56.3399 13.9824 57.0196 13.1611C57.0621 13.1045 57.147 13.0903 57.2037 13.1045C57.2744 13.1328 57.3169 13.1895 57.3169 13.2602V14.2231H59.2567ZM54.6267 12.6797C53.0691 12.6797 51.8514 11.4195 51.8514 9.80538C51.8514 8.19122 53.0691 6.93104 54.6267 6.93104C56.1842 6.93104 57.4019 8.19122 57.4019 9.80538C57.4019 11.4195 56.1842 12.6797 54.6267 12.6797Z" fill="#E4ECF1"/>
      <path d="M62.8104 13.1751C62.8246 13.1751 62.8529 13.1609 62.8671 13.1609C62.9095 13.1609 62.9662 13.1892 62.9945 13.2175C63.66 13.9963 64.6936 14.4352 65.8264 14.4352C68.2476 14.4352 70.1449 12.3963 70.1449 9.791C70.1449 8.51666 69.706 7.34144 68.8989 6.47772C68.0918 5.61401 67.0016 5.14675 65.8264 5.14675C64.7078 5.14675 63.6741 5.61401 62.9945 6.42109C62.952 6.47772 62.8812 6.49188 62.8104 6.47772C62.7396 6.44941 62.6971 6.39277 62.6971 6.32197V1.50781H60.7432V14.2229H62.6971V13.3308C62.6971 13.26 62.7396 13.2034 62.8104 13.1751ZM62.6122 9.80516C62.6122 8.191 63.8299 6.93082 65.3874 6.93082C66.9449 6.93082 68.1626 8.191 68.1626 9.80516C68.1626 11.4193 66.9449 12.6795 65.3874 12.6795C63.8299 12.6795 62.6122 11.4052 62.6122 9.80516Z" fill="#E4ECF1"/>
      <path d="M75.7946 7.18591C75.9787 7.18591 76.1486 7.20007 76.2619 7.22839V5.21777C76.1911 5.20361 76.0637 5.18945 75.9362 5.18945C74.9168 5.18945 73.9823 5.71335 73.4867 6.54874C73.4442 6.61954 73.3734 6.64786 73.3026 6.61954C73.2318 6.60538 73.1752 6.53459 73.1752 6.46379V5.37352H71.2354V14.2372H73.1893V10.3293C73.1893 8.38945 74.1805 7.18591 75.7946 7.18591Z" fill="#E4ECF1"/>
      <path d="M79.476 5.37329H77.4937V14.237H79.476V5.37329Z" fill="#E4ECF1"/>
      <path d="M78.4565 1.52197C77.791 1.52197 77.2529 2.06003 77.2529 2.72551C77.2529 3.391 77.791 3.92905 78.4565 3.92905C79.122 3.92905 79.66 3.391 79.66 2.72551C79.66 2.06003 79.122 1.52197 78.4565 1.52197Z" fill="#E4ECF1"/>
      <path d="M85.2814 5.14697C82.5629 5.14697 80.5947 7.10096 80.5947 9.80538C80.5947 11.1222 81.062 12.2974 81.8974 13.147C82.7469 13.9965 83.9363 14.4638 85.2673 14.4638C86.3717 14.4638 87.2213 14.2514 88.8354 13.062L87.7168 11.8868C86.9239 12.4107 86.1877 12.6656 85.4655 12.6656C83.823 12.6656 82.5912 11.4337 82.5912 9.80538C82.5912 8.17706 83.823 6.9452 85.4655 6.9452C86.2443 6.9452 86.9664 7.20007 87.6885 7.72396L88.9346 6.54874C87.4761 5.30273 86.1593 5.14697 85.2814 5.14697Z" fill="#E4ECF1"/>
      <path d="M92.2762 10.3291C92.3045 10.3007 92.347 10.2866 92.3895 10.2866H92.4037C92.4461 10.2866 92.4886 10.3149 92.5311 10.3432L95.6603 14.2229H98.0674L94.0178 9.32374C93.9612 9.25295 93.9612 9.15383 94.032 9.09719L97.7559 5.3733H95.3629L92.1488 8.60162C92.1063 8.6441 92.0355 8.65826 91.9647 8.6441C91.9081 8.61578 91.8656 8.55914 91.8656 8.48834V1.52197H89.8975V14.237H91.8514V10.7822C91.8514 10.7397 91.8656 10.683 91.9081 10.6547L92.2762 10.3291Z" fill="#E4ECF1"/>
      <path d="M101.253 14.4494C102.853 14.4494 104.482 13.4724 104.482 11.6175C104.482 10.3998 103.717 9.56443 102.159 9.05469L101.097 8.70071C100.375 8.46 100.036 8.12018 100.036 7.65292C100.036 7.11487 100.517 6.74673 101.197 6.74673C101.848 6.74673 102.428 7.17151 102.797 7.90779L104.368 7.05823C103.788 5.86885 102.584 5.13257 101.197 5.13257C99.4408 5.13257 98.1665 6.26531 98.1665 7.80867C98.1665 9.04053 98.9028 9.86177 100.418 10.3432L101.508 10.6972C102.273 10.9379 102.598 11.2494 102.598 11.745C102.598 12.4954 101.905 12.7644 101.31 12.7644C100.517 12.7644 99.809 12.2547 99.4691 11.4193L97.8691 12.2689C98.393 13.614 99.6815 14.4494 101.253 14.4494Z" fill="#E4ECF1"/>
      <path d="M48.0847 14.3645C48.7077 14.3645 49.2599 14.3079 49.5714 14.2654V12.5663C49.3166 12.5946 48.8635 12.6229 48.5944 12.6229C47.8015 12.6229 47.1927 12.4813 47.1927 10.7681V7.12912C47.1927 7.03001 47.2635 6.95921 47.3626 6.95921H49.2741V5.35921H47.3626C47.2635 5.35921 47.1927 5.28841 47.1927 5.1893V2.64062H45.2387V5.20346C45.2387 5.30257 45.1679 5.37337 45.0688 5.37337H43.7095V6.97337H45.0688C45.1679 6.97337 45.2387 7.04417 45.2387 7.14328V11.2636C45.2387 14.3645 47.3059 14.3645 48.0847 14.3645Z" fill="#E4ECF1"/>
    </g>
    <defs><clipPath id="clip0_db"><rect width="104.481" height="15.9717" fill="white"/></clipPath></defs>
  </svg>
);

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    items: [
      { id: 'overview',  label: 'Overview',        icon: Icon.Overview },
      { id: 'genie',     label: 'Genie',           icon: Icon.Sparkle },
      { id: 'marketplace',label:'Marketplace',     icon: Icon.Grid },
    ]
  },
  {
    label: 'Configure',
    items: [
      { id: 'datasources',   label: 'Datasources',     icon: Icon.Datasource },
      { id: 'detection',     label: 'Detection rules',  icon: Icon.Detection },
      { id: 'settings',      label: 'Settings',         icon: Icon.Settings },
    ]
  },
  {
    label: 'Explore',
    items: [
      { id: 'security',   label: 'Security cases',  icon: Icon.Shield },
      { id: 'system',     label: 'System cases',    icon: Icon.Triangle },
      { id: 'observables',label: 'Observables',     icon: Icon.Eye },
      { id: 'query',      label: 'Query',           icon: Icon.Search2 },
    ]
  },
  {
    label: 'Virtual SOC',
    items: [
      { id: 'skill-config', label: 'Skill config',  icon: Icon.Wrench },
      { id: 'task-center',  label: 'Task center',   icon: Icon.Tasks, active: true },
    ]
  },
  {
    label: 'Lakehouse',
    items: [
      { id: 'catalog',    label: 'Catalog',     icon: Icon.Book,  external: true },
      { id: 'dashboards', label: 'Dashboards',  icon: Icon.Chart, external: true },
      { id: 'workspace',  label: 'Workspace',   icon: Icon.Box,   external: true },
    ]
  },
];

function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside style={{
      width: 220, minWidth: 220, background: '#1a2234', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <DatabricksLogo />
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
        <span style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Lakewatch</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {NAV_GROUPS.map((grp, gi) => (
          <div key={gi} style={{ marginBottom: 4 }}>
            {grp.label && (
              <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {grp.label}
              </div>
            )}
            {grp.items.map(item => {
              const isActive = activeNav === item.id;
              const Ic = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                    padding: '6px 16px', border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: isActive ? 'rgba(59,130,246,0.15)' : 'transparent',
                    borderLeft: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                    color: isActive ? '#93c5fd' : '#94a3b8',
                    fontSize: 13.5, fontWeight: isActive ? 500 : 400,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#cbd5e1'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
                >
                  <Ic style={{ width: 15, height: 15, flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.external && <Icon.External style={{ width: 11, height: 11, opacity: 0.4 }} />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── TASK STATUS BADGE ────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS[status] || STATUS.queued;
  const Ic = cfg.icon;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }} className={cfg.cls}>
      <Ic />
      <span style={{ fontSize: 12.5, fontWeight: 500 }}>{cfg.label}</span>
    </span>
  );
}

// ─── REVIEW PANEL ─────────────────────────────────────────────────────────────
function ReviewPanel({ task, onClose, onSubmit }) {
  const [response, setResponse] = useState('');
  const [selected, setSelected] = useState(null);
  const rd = task.reviewData;

  const handleQuickAction = (action) => {
    setSelected(action);
    setResponse(action);
  };

  const handleSubmit = () => {
    if (!response.trim() && !selected) return;
    onSubmit(task.id, response || selected);
  };

  return (
    <div style={{
      width: 340, minWidth: 340, background: '#1a2234',
      borderLeft: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 0.25s ease-out',
    }}>
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.3 }}>
              {rd.agentName} requires assistance
            </h2>
            <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Paused – Awaiting input</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 6, padding: '4px 6px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
          >
            <Icon.X style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>

        {/* Task content */}
        <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Task content</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>{rd.taskTitle}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>{rd.taskSubtitle}</div>
        </div>

        {/* Agent analysis */}
        <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Agent analysis</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon.Bot style={{ width: 15, height: 15, color: '#60a5fa' }} />
            </div>
            <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {rd.analysis}
            </div>
          </div>
        </div>

        {/* Supporting evidence */}
        <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Supporting evidence</div>
          <div style={{
            background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
            padding: '12px 14px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94a3b8',
            lineHeight: 1.7, whiteSpace: 'pre', overflowX: 'auto',
          }}>
            {rd.evidence}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Quick actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {rd.quickActions.map(action => (
              <button
                key={action}
                onClick={() => handleQuickAction(action)}
                style={{
                  textAlign: 'left', padding: '8px 12px', borderRadius: 7, fontSize: 12.5, fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: selected === action ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                  border: selected === action ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  color: selected === action ? '#93c5fd' : '#cbd5e1',
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Your response */}
        <div style={{ padding: '14px 0 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Your response</div>
          <textarea
            value={response}
            onChange={e => { setResponse(e.target.value); setSelected(null); }}
            placeholder="Provide guidance to the agent..."
            style={{
              width: '100%', minHeight: 80, resize: 'vertical',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '10px 12px',
              color: '#e2e8f0', fontSize: 13, lineHeight: 1.5, outline: 'none',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
      </div>

      {/* Submit */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '10px 16px', borderRadius: 8, border: 'none',
            background: (response.trim() || selected) ? 'linear-gradient(135deg,#2563eb,#1d4ed8)' : 'rgba(37,99,235,0.3)',
            color: (response.trim() || selected) ? '#fff' : '#64748b',
            fontSize: 13.5, fontWeight: 600, cursor: (response.trim() || selected) ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.15s',
          }}
        >
          <Icon.Send style={{ width: 14, height: 14 }} />
          Submit &amp; resume agent
        </button>
      </div>
    </div>
  );
}

// ─── TASK ROW ─────────────────────────────────────────────────────────────────
function TaskRow({ task, onReview, onPause, onDismiss, isPaused }) {
  const [hovered, setHovered] = useState(false);
  const displayStatus = isPaused ? 'paused' : task.status;

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.025)' : 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.12s',
      }}
    >
      {/* Drag handle + Queue number */}
      <td style={{ padding: '12px 12px 12px 16px', width: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon.Grip style={{ width: 14, height: 14, color: '#475569', flexShrink: 0, opacity: hovered ? 0.8 : 0 }} />
          <div style={{
            width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#94a3b8', flexShrink: 0,
          }}>
            {task.queue}
          </div>
        </div>
      </td>

      {/* Status */}
      <td style={{ padding: '12px 16px', width: 130 }}>
        <StatusBadge status={displayStatus} />
      </td>

      {/* Task */}
      <td style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: '#e2e8f0', lineHeight: 1.35 }}>{task.title}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{task.subtitle}</div>
      </td>

      {/* Agent */}
      <td style={{ padding: '12px 16px', width: 100, fontSize: 13, color: '#94a3b8', whiteSpace: 'nowrap' }}>
        {task.agent}
      </td>

      {/* Duration */}
      <td style={{ padding: '12px 16px', width: 80, fontSize: 13, color: '#94a3b8', whiteSpace: 'nowrap' }}>
        {task.duration}
      </td>

      {/* Actions */}
      <td style={{ padding: '12px 16px', width: 130 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {task.canReview && (
            <button
              onClick={() => onReview(task)}
              style={{
                padding: '4px 10px', borderRadius: 6, border: '1px solid #ef4444',
                background: 'rgba(239,68,68,0.12)', color: '#f87171', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
            >
              Review
            </button>
          )}
          <button
            onClick={() => onPause(task.id)}
            style={{
              width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#e2e8f0'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <Icon.Pause style={{ width: 11, height: 11 }} />
          </button>
          <button
            onClick={() => onDismiss(task.id)}
            style={{
              width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <Icon.X style={{ width: 11, height: 11 }} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── TASK CENTER (main screen) ────────────────────────────────────────────────
function TaskCenter() {
  const [tasks, setTasks] = useState(TASKS_INIT);
  const [reviewTask, setReviewTask] = useState(null);
  const [searchQ, setSearchQ] = useState('');
  const [agentFilter, setAgentFilter] = useState('All agents');
  const [requiresInput, setRequiresInput] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [pausedIds, setPausedIds] = useState(new Set());
  const [completedIds, setCompletedIds] = useState(new Set());
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleReview = (task) => setReviewTask(task);
  const handleCloseReview = () => setReviewTask(null);

  const handlePause = (id) => {
    setPausedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleDismiss = (id) => {
    setCompletedIds(prev => new Set([...prev, id]));
    if (reviewTask?.id === id) setReviewTask(null);
    showToast('Task dismissed');
  };

  const handleSubmit = (taskId, responseText) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'working', canReview: false } : t));
    setPausedIds(prev => { const n = new Set(prev); n.delete(taskId); return n; });
    setReviewTask(null);
    showToast('Response submitted — agent resumed');
  };

  const visibleTasks = tasks.filter(t => {
    if (!viewCompleted && completedIds.has(t.id)) return false;
    if (requiresInput && t.status !== 'needs_input') return false;
    if (agentFilter !== 'All agents' && t.agent !== agentFilter) return false;
    if (searchQ && !t.title.toLowerCase().includes(searchQ.toLowerCase()) && !t.subtitle.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const needsInputCount = tasks.filter(t => t.status === 'needs_input' && !completedIds.has(t.id)).length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Page header */}
      <div style={{ padding: '24px 32px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
              Virtual SOC task center
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
              View current tasks being executed by Virtual SOC agents, provide input when required, and pause or reorder priority as needed.
            </p>
          </div>
          {/* Workspace selector */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
            color: '#cbd5e1', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            dedemos-serverless
            <Icon.ChevDown style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '20px 32px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', marginBottom: 14 }}>Current tasks</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Icon.Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#475569' }} />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search tasks"
              style={{
                padding: '7px 12px 7px 32px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', fontSize: 13, outline: 'none',
                width: 200,
              }}
            />
          </div>

          {/* Agent filter */}
          <div style={{ position: 'relative' }}>
            <select
              value={agentFilter}
              onChange={e => setAgentFilter(e.target.value)}
              style={{
                padding: '7px 30px 7px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', fontSize: 13, outline: 'none',
                appearance: 'none', cursor: 'pointer',
              }}
            >
              <option value="All agents">All agents</option>
              <option value="Agent 3">Agent 3</option>
              <option value="Agent 7">Agent 7</option>
            </select>
            <Icon.ChevDown style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: '#64748b', pointerEvents: 'none' }} />
          </div>

          {/* Requires input checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', userSelect: 'none', fontSize: 13, color: '#94a3b8' }}>
            <div
              onClick={() => setRequiresInput(!requiresInput)}
              style={{
                width: 16, height: 16, borderRadius: 4, border: '1.5px solid', cursor: 'pointer',
                borderColor: requiresInput ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                background: requiresInput ? '#3b82f6' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
              }}
            >
              {requiresInput && <svg viewBox="0 0 10 8" width="9" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
            </div>
            Requires input
            {needsInputCount > 0 && (
              <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '1px 6px', fontSize: 11, fontWeight: 600 }}>
                {needsInputCount}
              </span>
            )}
          </label>

          {/* View completed */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', userSelect: 'none', fontSize: 13, color: '#94a3b8' }}>
            <div
              onClick={() => setViewCompleted(!viewCompleted)}
              style={{
                width: 16, height: 16, borderRadius: 4, border: '1.5px solid', cursor: 'pointer',
                borderColor: viewCompleted ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                background: viewCompleted ? '#3b82f6' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
              }}
            >
              {viewCompleted && <svg viewBox="0 0 10 8" width="9" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
            </div>
            View completed
          </label>
        </div>
      </div>

      {/* Task table + Review panel */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', marginTop: 16 }}>
        {/* Table */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { label: 'Queue', w: 72, sort: true },
                  { label: 'Status', w: 130 },
                  { label: 'Task' },
                  { label: 'Agent', w: 100 },
                  { label: 'Duration', w: 80 },
                  { label: 'Actions', w: 130 },
                ].map(col => (
                  <th key={col.label} style={{
                    padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600,
                    color: '#475569', letterSpacing: '0.03em', textTransform: 'uppercase',
                    width: col.w || 'auto',
                  }}>
                    {col.label === 'Queue'
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          Queue <Icon.SortAsc style={{ width: 11, height: 11, opacity: 0.5 }} />
                        </span>
                      : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleTasks.map(task => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onReview={handleReview}
                  onPause={handlePause}
                  onDismiss={handleDismiss}
                  isPaused={pausedIds.has(task.id)}
                />
              ))}
              {visibleTasks.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 32px', textAlign: 'center', color: '#475569', fontSize: 13 }}>
                    No tasks match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Review panel */}
        {reviewTask && (
          <ReviewPanel
            task={reviewTask}
            onClose={handleCloseReview}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
          padding: '10px 18px', fontSize: 13, color: '#e2e8f0', fontWeight: 500,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', animation: 'fade-up 0.2s ease-out',
          display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', zIndex: 100,
        }}>
          <svg viewBox="0 0 20 20" fill="#22c55e" width="16" height="16"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// ─── SKILL CONFIG SCREEN ──────────────────────────────────────────────────────
const PRIORITY_COLORS = { High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' };

const AGENTS_ROSTER = [
  { id: 'va1', name: 'V-Agent 01', task: 'Verify Suspicious PowerShell ...', dot: '#ef4444' },
  { id: 'va2', name: 'V-Agent 02', task: 'Researching CVE-2024-38077',     dot: '#22c55e' },
  { id: 'va3', name: 'V-Agent 03', task: 'Correlating VPN & O365 logs',    dot: '#f59e0b' },
  { id: 'va4', name: 'V-Agent 04', task: 'Investigating Firewall-Z log gap', dot: '#22c55e' },
  { id: 'va5', name: 'V-Agent 05', task: 'Idle',                           dot: '#3b82f6' },
];

const INIT_SKILL_LIST = [
  { id: 'sk1', name: 'Investigate High-Fidelity Cases', avg: '5m', priority: 'High',
    instructions: 'Investigate high-fidelity alerts from EDR, NDR, and SIEM. Correlate IOCs across data sources, check threat intel feeds, and provide a severity assessment with recommended response actions.' },
  { id: 'sk2', name: 'Failing Data Source Triage', avg: '3m', priority: 'Medium',
    instructions: 'Monitor data source health dashboards. When a source stops sending logs, check connectivity, service status, and recent changes. Escalate if source is critical.' },
  { id: 'sk3', name: 'False Positive Reduction', avg: '8m', priority: 'Low',
    instructions: 'Review detection rules with high false positive rates. Analyze benign close patterns and suggest tuning adjustments to reduce noise without missing true positives.' },
  { id: 'sk4', name: 'Threat Intelligence Research', avg: '12m', priority: 'Medium',
    instructions: 'Research emerging threats, CVEs, and adversary TTPs. Correlate with internal asset exposure and provide actionable intelligence briefs for the SOC team.' },
  { id: 'sk5', name: 'Case Correlation & Grouping', avg: '4m', priority: 'High',
    instructions: 'Identify related cases and notables across the environment. Link cases that share IOCs, affected hosts, or attack patterns. Comment with reasoning.' },
];

const ADDABLE_SKILLS = [
  'Investigate high-fidelity cases',
  'Failing data source triage',
  'False positive reduction',
  'Threat intelligence research',
  'Case correlation & grouping',
  'Assign or group notables into cases',
];

function SkillConfig() {
  const [skills, setSkills] = useState(INIT_SKILL_LIST);
  const [selectedId, setSelectedId] = useState('sk5');
  const [instructions, setInstructions] = useState({});
  const [addOpen, setAddOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const dropRef = useRef(null);

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3000); };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setAddOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedSkill = skills.find(s => s.id === selectedId);
  const currentInstr = instructions[selectedId] ?? selectedSkill?.instructions ?? '';

  const handleSave = () => {
    setSkills(prev => prev.map(s => s.id === selectedId ? { ...s, instructions: currentInstr } : s));
    showToast('Instructions saved');
  };

  const handleAddSkill = (name) => {
    const newId = 'sk' + Date.now();
    const newSkill = { id: newId, name, avg: '—', priority: 'Medium', instructions: '' };
    setSkills(prev => [...prev, newSkill]);
    setSelectedId(newId);
    setAddOpen(false);
    showToast(`Added "${name}"`);
  };

  const handleAddCustom = () => {
    const newId = 'sk' + Date.now();
    const newSkill = { id: newId, name: 'New Custom Skill', avg: '—', priority: 'Medium', instructions: '' };
    setSkills(prev => [...prev, newSkill]);
    setSelectedId(newId);
    setAddOpen(false);
  };

  const handleDeploy = () => showToast('Configuration deployed successfully');

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
      {/* ── LEFT PANEL: Agent roster ── */}
      <div style={{
        width: 260, minWidth: 260, background: '#151d2e', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0,
      }}>
        {/* Header */}
        <div style={{ padding: '20px 16px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <Icon.Bot style={{ width: 16, height: 16, color: '#64748b' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Virtual Force Capacity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Active agents</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>5</span>
          </div>
          <button style={{
            width: '100%', padding: '7px 0', borderRadius: 7, fontSize: 12.5, fontWeight: 500,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', cursor: 'pointer',
          }}>Add an agent</button>
        </div>

        {/* Agent roster */}
        <div style={{ padding: '6px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Agent Roster</div>
          {AGENTS_ROSTER.map(a => (
            <div key={a.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
              marginBottom: 6, cursor: 'pointer',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{a.name}</div>
                <div style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.task}</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ padding: '16px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>223</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Tasks today</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>4.2m</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Avg. resolution time</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, justifyContent: 'center' }}>
            <Icon.AlertCircle style={{ width: 13, height: 13, color: '#64748b' }} />
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Est. Monthly Compute: <b style={{ color: '#e2e8f0' }}>$6,200</b></span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT: Skill list ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 28px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Skill Configuration</h1>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b' }}>
                Drag skills to reorder priority. Agents pick up the highest priority tasks available first.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7,
                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                color: '#cbd5e1', fontSize: 13, cursor: 'pointer',
              }}>
                dedemos-serverless <Icon.ChevDown style={{ width: 13, height: 13 }} />
              </button>
              <button onClick={handleDeploy} style={{
                padding: '7px 16px', borderRadius: 7, border: 'none', fontSize: 13, fontWeight: 600,
                background: '#16a34a', color: '#fff', cursor: 'pointer',
              }}>
                Deploy configuration
              </button>
            </div>
          </div>
        </div>

        {/* Skill list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px 24px' }}>
          {skills.map((skill, idx) => {
            const isSelected = selectedId === skill.id;
            const pColor = PRIORITY_COLORS[skill.priority] || '#64748b';
            const instrValue = instructions[skill.id] ?? skill.instructions ?? '';
            return (
              <div key={skill.id} style={{ marginBottom: 6 }}>
                {/* Row header */}
                <div
                  onClick={() => setSelectedId(isSelected ? null : skill.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                    background: isSelected ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)',
                    border: isSelected ? '1px solid rgba(59,130,246,0.25)' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: isSelected ? '10px 10px 0 0' : 10,
                    cursor: 'pointer', transition: 'all 0.12s',
                  }}
                >
                  <Icon.Grip style={{ width: 16, height: 16, color: '#475569', flexShrink: 0 }} />
                  <div style={{
                    width: 24, height: 24, borderRadius: 7, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: '#94a3b8', flexShrink: 0,
                  }}>{idx + 1}</div>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#e2e8f0' }}>{skill.name}</span>
                  <span style={{ fontSize: 12, color: '#64748b', marginRight: 6 }}>Avg: {skill.avg}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                    background: `${pColor}18`, color: pColor, border: `1px solid ${pColor}40`,
                  }}>{skill.priority}</span>
                  <Icon.ChevDown style={{
                    width: 14, height: 14, color: '#64748b', flexShrink: 0,
                    transition: 'transform 0.2s', transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                  }} />
                </div>
                {/* Accordion panel */}
                {isSelected && (
                  <div style={{
                    background: 'rgba(59,130,246,0.04)',
                    border: '1px solid rgba(59,130,246,0.25)', borderTop: 'none',
                    borderRadius: '0 0 10px 10px', padding: '14px 16px',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Natural language instructions</div>
                    <textarea
                      value={instrValue}
                      onClick={e => e.stopPropagation()}
                      onChange={e => setInstructions(prev => ({ ...prev, [skill.id]: e.target.value }))}
                      placeholder="Enter agent instructions here..."
                      style={{
                        width: '100%', minHeight: 80, resize: 'vertical',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, padding: '10px 14px', color: '#cbd5e1', fontSize: 13,
                        lineHeight: 1.6, outline: 'none', fontFamily: 'inherit',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                      <button onClick={(e) => { e.stopPropagation(); handleSave(); }} style={{
                        padding: '6px 18px', borderRadius: 7, border: 'none', fontSize: 13, fontWeight: 600,
                        background: '#2563eb', color: '#fff', cursor: 'pointer',
                      }}>Save</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add skill dropdown */}
          <div style={{ marginTop: 16, position: 'relative' }} ref={dropRef}>
            <button
              onClick={() => setAddOpen(!addOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 7,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >
              Add skill <Icon.ChevDown style={{ width: 13, height: 13 }} />
            </button>
            {addOpen && (
              <div style={{
                position: 'absolute', left: 0, top: '100%', marginTop: 4, width: 300,
                background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 50, padding: '6px 0',
              }}>
                {ADDABLE_SKILLS.map(name => (
                  <button
                    key={name}
                    onClick={() => handleAddSkill(name)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '8px 16px',
                      background: 'transparent', border: 'none', color: '#cbd5e1', fontSize: 13,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{name}</button>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <button
                  onClick={handleAddCustom}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, width: '100%', textAlign: 'left',
                    padding: '8px 16px', background: 'transparent', border: 'none', color: '#94a3b8',
                    fontSize: 13, cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 15, lineHeight: 1 }}>+</span> Add custom skill
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
          padding: '10px 18px', fontSize: 13, color: '#e2e8f0', fontWeight: 500,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', animation: 'fade-up 0.2s ease-out',
          display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', zIndex: 100,
        }}>
          <svg viewBox="0 0 20 20" fill="#22c55e" width="16" height="16"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState('task-center');

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#111827', color: '#e2e8f0', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', background: '#162032', borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <Icon.Menu style={{ width: 18, height: 18 }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Environment */}
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', fontSize: 12.5, cursor: 'pointer' }}>
              Production <Icon.ChevDown style={{ width: 12, height: 12 }} />
            </button>
            <Icon.Sparkle style={{ width: 16, height: 16, color: '#64748b', cursor: 'pointer' }} />
            <Icon.Grid style={{ width: 16, height: 16, color: '#64748b', cursor: 'pointer' }} />
            {/* Avatar */}
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', userSelect: 'none' }}>
              J
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {activeNav === 'task-center' && <TaskCenter />}
          {activeNav === 'skill-config' && <SkillConfig />}
          {activeNav !== 'task-center' && activeNav !== 'skill-config' && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', flexDirection: 'column', gap: 10 }}>
              <Icon.Shield style={{ width: 40, height: 40, opacity: 0.3 }} />
              <span style={{ fontSize: 14 }}>Select a view from the sidebar</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fade-up { from { opacity: 0; transform: translateY(8px) translateX(-50%); } to { opacity: 1; transform: translateY(0) translateX(-50%); } }
        * { box-sizing: border-box; }
        select option { background: #1e293b; color: #e2e8f0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
