import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { TextField, SelectField } from '../components/FormField';
import { INDIAN_STATES } from '../data/indianStates';

/* ── Section config ──────────────────────────── */
const SECTIONS = [
  { key: 'location', label: 'Location', color: '#3B82F6', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )},
  { key: 'personal', label: 'Personal Information', color: '#8B5CF6', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )},
  { key: 'status', label: 'Socio-Economic Status', color: '#D97706', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )},
];

function SectionCard({ sectionKey, children }) {
  const s = SECTIONS.find((x) => x.key === sectionKey);
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
          style={{ background: s.color, boxShadow: `0 4px 12px ${s.color}40` }}
        >
          {s.icon}
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: s.color }}>
          {s.label}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
      <path d="M22 12a10 10 0 00-10-10" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Edit Profile page ───────────────────────── */
export default function EditProfile() {
  const { t }                          = useTranslation();
  const navigate                       = useNavigate();
  const { currentUser, updateProfile } = useAuth();

  const [form, setForm]           = useState(null);  // null until pre-filled
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Pre-fill form from currentUser */
  useEffect(() => {
    if (!currentUser) { navigate('/signin'); return; }
    setForm({
      age:               String(currentUser.age  || ''),
      gender:            currentUser.gender           || '',
      state:             currentUser.state            || '',
      district:          currentUser.district         || '',
      occupation:        currentUser.occupation       || '',
      annual_income:     String(currentUser.annual_income || ''),
      category:          currentUser.category         || '',
      education_level:   currentUser.education_level  || '',
      disability_status: currentUser.disability_status ? 'yes' : 'no',
      marital_status:    currentUser.marital_status   || '',
    });
  }, [currentUser, navigate]);

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  /* Options */
  const stateOptions         = INDIAN_STATES.map((n) => ({ value: n, label: n }));
  const genderOptions        = [
    { value: 'Male',   label: t('onboarding.options.gender.male') },
    { value: 'Female', label: t('onboarding.options.gender.female') },
    { value: 'Other',  label: t('onboarding.options.gender.other') },
  ];
  const maritalStatusOptions = [
    { value: 'Single',   label: t('onboarding.options.maritalStatus.single') },
    { value: 'Married',  label: t('onboarding.options.maritalStatus.married') },
    { value: 'Widowed',  label: t('onboarding.options.maritalStatus.widowed') },
    { value: 'Divorced', label: t('onboarding.options.maritalStatus.divorced') },
  ];
  const categoryOptions      = [
    { value: 'General', label: t('onboarding.options.category.general') },
    { value: 'OBC',     label: t('onboarding.options.category.obc') },
    { value: 'SC',      label: t('onboarding.options.category.sc') },
    { value: 'ST',      label: t('onboarding.options.category.st') },
  ];
  const occupationOptions    = [
    { value: 'Student',      label: t('onboarding.options.occupation.student') },
    { value: 'Farmer',       label: t('onboarding.options.occupation.farmer') },
    { value: 'Worker',       label: t('onboarding.options.occupation.worker') },
    { value: 'Entrepreneur', label: t('onboarding.options.occupation.entrepreneur') },
    { value: 'Unemployed',   label: t('onboarding.options.occupation.unemployed') },
    { value: 'Retired',      label: t('onboarding.options.occupation.retired') },
  ];
  const educationOptions     = [
    { value: '10th',         label: t('onboarding.options.education.below10') },
    { value: 'Intermediate', label: t('onboarding.options.education.intermediate') },
    { value: 'UG',           label: t('onboarding.options.education.ug') },
    { value: 'PG',           label: t('onboarding.options.education.pg') },
    { value: 'PhD',          label: t('onboarding.options.education.phd') },
    { value: 'Any',          label: t('onboarding.options.education.any') },
  ];
  const yesNoOptions         = [
    { value: 'no',  label: t('onboarding.options.yesNo.no') },
    { value: 'yes', label: t('onboarding.options.yesNo.yes') },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      await updateProfile({
        age:               parseInt(form.age, 10),
        gender:            form.gender,
        state:             form.state,
        district:          form.district,
        occupation:        form.occupation,
        annual_income:     parseFloat(form.annual_income),
        category:          form.category,
        education_level:   form.education_level,
        disability_status: form.disability_status === 'yes',
        marital_status:    form.marital_status,
      });
      setSuccess('Profile updated! Your scheme matches will refresh.');
      setTimeout(() => navigate('/'), 1800);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Wait for pre-fill */
  if (!form) return null;

  const isValid =
    form.age && form.gender && form.state && form.district.trim() &&
    form.occupation && form.annual_income && form.category &&
    form.education_level && form.disability_status && form.marital_status;

  const profileCompletion = () => {
    const vals = Object.values(form).filter((v) => v !== '');
    return Math.round((vals.length / Object.keys(form).length) * 100);
  };

  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{ background: 'linear-gradient(145deg, #060E1C 0%, #0F1B30 30%, #1A2C50 65%, #243965 100%)' }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E98A15, transparent)' }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3E5C8A, transparent)' }} />
      </div>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 backdrop-blur-md"
        style={{ background: 'rgba(6,14,28,0.85)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-indigo-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>

        <div className="flex-1 text-center">
          <h1 className="font-display text-base font-bold text-white">Edit Profile</h1>
        </div>

        {/* Completion badge */}
        <div
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(233,138,21,0.15)',
            color: '#F0A23E',
            border: '1px solid rgba(233,138,21,0.25)',
          }}
        >
          {profileCompletion()}% complete
        </div>
      </header>

      {/* ── Content ── */}
      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* Account info (read-only) */}
        <div
          className="rounded-2xl p-5 mb-6 flex items-center gap-4"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #E98A15, #F0A23E)', boxShadow: '0 6px 20px rgba(233,138,21,0.4)' }}
          >
            {currentUser?.full_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-white text-base">{currentUser?.full_name}</p>
            <p className="text-xs text-indigo-400 mt-0.5">{currentUser?.email}</p>
            <span
              className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Email verified
            </span>
          </div>
          <p className="text-[10px] text-indigo-400/60 text-right hidden sm:block leading-relaxed">
            Name &amp; email<br/>cannot be changed
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Location */}
          <SectionCard sectionKey="location">
            <SelectField
              id="edit-state"
              label={t('onboarding.fields.state')}
              required
              value={form.state}
              onChange={set('state')}
              options={stateOptions}
              placeholder={t('onboarding.placeholders.state')}
            />
            <TextField
              id="edit-district"
              label={t('onboarding.fields.district')}
              required
              value={form.district}
              onChange={set('district')}
              placeholder={t('onboarding.placeholders.district')}
            />
          </SectionCard>

          {/* Personal */}
          <SectionCard sectionKey="personal">
            <TextField
              id="edit-age"
              label={t('onboarding.fields.age')}
              type="number"
              required
              inputMode="numeric"
              value={form.age}
              onChange={set('age')}
              placeholder={t('onboarding.placeholders.age')}
            />
            <SelectField
              id="edit-gender"
              label={t('onboarding.fields.gender')}
              required
              value={form.gender}
              onChange={set('gender')}
              options={genderOptions}
              placeholder={t('onboarding.placeholders.gender')}
            />
            <SelectField
              id="edit-marital-status"
              label={t('onboarding.fields.maritalStatus')}
              required
              value={form.marital_status}
              onChange={set('marital_status')}
              options={maritalStatusOptions}
              placeholder={t('onboarding.placeholders.maritalStatus')}
            />
          </SectionCard>

          {/* Socio-Economic */}
          <SectionCard sectionKey="status">
            <SelectField
              id="edit-category"
              label={t('onboarding.fields.category')}
              required
              value={form.category}
              onChange={set('category')}
              options={categoryOptions}
              placeholder={t('onboarding.placeholders.category')}
            />
            <SelectField
              id="edit-occupation"
              label={t('onboarding.fields.occupation')}
              required
              value={form.occupation}
              onChange={set('occupation')}
              options={occupationOptions}
              placeholder={t('onboarding.placeholders.occupation')}
            />
            <TextField
              id="edit-annual-income"
              label={t('onboarding.fields.annualIncome')}
              type="number"
              required
              value={form.annual_income}
              onChange={set('annual_income')}
              placeholder={t('onboarding.placeholders.annualIncome')}
            />
            <SelectField
              id="edit-education-level"
              label={t('onboarding.fields.educationLevel')}
              required
              value={form.education_level}
              onChange={set('education_level')}
              options={educationOptions}
              placeholder={t('onboarding.placeholders.educationLevel')}
            />
            <SelectField
              id="edit-disability-status"
              label={t('onboarding.fields.disabilityStatus')}
              required
              value={form.disability_status}
              onChange={set('disability_status')}
              options={yesNoOptions}
              placeholder={t('onboarding.placeholders.disabilityStatus')}
            />
          </SectionCard>

          {/* Feedback */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl text-sm text-red-200 animate-slide-up"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.2)' }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl text-sm text-emerald-200 animate-slide-up"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {success}
            </div>
          )}

          {/* Save button */}
          <div className="pt-2 pb-8">
            <button
              id="edit-profile-save-btn"
              type="submit"
              disabled={isSubmitting || !isValid}
              className="btn-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Spinner /> Saving Changes…</>
              ) : (
                <>
                  Save Changes
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </>
              )}
            </button>
            <p className="mt-3 text-center text-[11px] text-indigo-300/50">
              Updating your profile refreshes your scheme recommendations
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
