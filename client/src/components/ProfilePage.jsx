import { ALLERGENS } from '../lib/storage'

export default function ProfilePage({ profile, onSave }) {
  const toggleAllergy = (allergen) => {
    const allergies = profile.allergies.includes(allergen)
      ? profile.allergies.filter((a) => a !== allergen)
      : [...profile.allergies, allergen]
    onSave({ ...profile, allergies })
  }

  const numberField = (key, label) => (
    <label className="field" key={key}>
      <span>{label}</span>
      <input
        type="number"
        min="0"
        value={profile[key]}
        onChange={(e) => onSave({ ...profile, [key]: Number(e.target.value) || 0 })}
      />
    </label>
  )

  return (
    <section>
      <h2 className="section-title">Your profile</h2>
      <p className="hint">Saved on this device — used to filter and rank dishes.</p>

      <div className="card profile-card">
        <h3>Dietary goals</h3>
        {numberField('calorieTarget', 'Daily calorie target')}
        {numberField('proteinTargetG', 'Protein target (g/day)')}
        {numberField('carbTargetG', 'Carb target (g/day)')}
        {numberField('sugarLimitG', 'Sugar limit (g/day)')}
      </div>

      <div className="card profile-card">
        <h3>Food allergies</h3>
        <p className="hint">Dishes containing these are flagged or hidden by filters.</p>
        <div className="allergy-grid">
          {ALLERGENS.map((a) => (
            <label key={a} className="allergy-option">
              <input
                type="checkbox"
                checked={profile.allergies.includes(a)}
                onChange={() => toggleAllergy(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
