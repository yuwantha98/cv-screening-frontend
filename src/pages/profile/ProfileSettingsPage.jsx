export default function ProfileSettingsPage() {
  return (
    <ProfileSettingsContent />
  );
}

function ProfileSettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const saveChanges = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-7"><p className="text-sm font-medium text-blue-600">Account</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Profile & settings</h1><p className="mt-1 text-sm text-slate-500">Manage your account details and workspace preferences.</p></div>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="h-fit rounded-xl border border-slate-200 bg-white p-2">{[{ id: "profile", label: "Personal profile", icon: UserRound }, { id: "security", label: "Password & security", icon: LockKeyhole }].map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${activeTab === id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={17} />{label}</button>)}</nav>
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7">{activeTab === "profile" ? <form onSubmit={saveChanges}><div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center"><div className="relative"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700">JD</div><button type="button" aria-label="Change profile photo" className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-blue-600 p-1.5 text-white"><Camera size={13} /></button></div><div><h2 className="font-semibold text-slate-900">Your profile</h2><p className="mt-1 text-sm text-slate-500">This information is visible to your team.</p></div></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="First name" defaultValue="Jordan" /><Field label="Last name" defaultValue="Davis" /><Field label="Work email" defaultValue="jordan.davis@company.com" type="email" /><Field label="Job title" defaultValue="HR Manager" /></div><label className="mt-5 block text-sm font-medium text-slate-700">About you<textarea rows="4" defaultValue="I manage hiring and candidate operations for our growing team." className="mt-2 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label><SaveBar saved={saved} /></form> : <form onSubmit={saveChanges}><h2 className="font-semibold text-slate-900">Password & security</h2><p className="mt-1 text-sm text-slate-500">Keep your account protected with a strong password.</p><div className="mt-6 space-y-5"><Field label="Current password" type="password" placeholder="Enter current password" /><Field label="New password" type="password" placeholder="Enter new password" /><Field label="Confirm new password" type="password" placeholder="Repeat new password" /></div><SaveBar saved={saved} label="Update password" /></form>}</div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", defaultValue, placeholder }) { return <label className="block text-sm font-medium text-slate-700">{label}<input required type={type} defaultValue={defaultValue} placeholder={placeholder} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>; }
function SaveBar({ saved, label = "Save changes" }) { return <div className="mt-7 flex items-center justify-end gap-3 border-t border-slate-100 pt-5"><span className={`text-sm text-emerald-600 ${saved ? "opacity-100" : "opacity-0"}`}><Check size={15} className="mr-1 inline" />Saved</span><button type="submit" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><Save size={15} className="mr-2 inline" />{label}</button></div>; }
