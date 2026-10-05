 @if ($errors->any())
     <div class="catalog-notice danger">
         <ul>
             @foreach ($errors->all() as $error)
                 <li>{{ $error }}</li>
             @endforeach
         </ul>
     </div>
 @endif

 <div class="service-form-grid maid-form-sections">
     <div class="form-section-heading wide"><p class="eyebrow">Identity</p><h3>Identity, contact and work information</h3></div>
     @if ($maid ?? false)
         <label class="field">
             <span>ID</span>
             <input value="{{ $maid->id }}" disabled readonly>
         </label>
     @else
         <input name="role" value="{{ request('role', 'customer') }}" hidden>
     @endif
     <label class="field">
         <span>Name</span>
         <input name="name" value="{{ old('name', $maid?->name) }}" required>
     </label>
     <label class="field">
         <span>Phone</span>
         <input name="phone" type="text" value="{{ old('phone', $maid?->phone) }}" required>
     </label>
     <label class="field">
         <span>Age</span>
         <input name="age" type="number" value="{{ old('age', $maid?->age) }}" required>
     </label>
     <label class="field">
         <span>Availability</span>
         <select name="status">
             @foreach (['active', 'inactive'] as $status)
                 <option value="{{ $status }}" @selected(old('status', $maid?->status ?? 'active') === $status)>{{ str($status)->title() }}</option>
             @endforeach
         </select>
     </label>

     <label class="field">
         <span>Start Date</span>
         <input name="start_date" type="date" value="{{ old('start_date', $maid?->start_date) }}" required>
     </label>
     <label class="field">
         <span>Address</span>
         <input name="address" value="{{ old('address', $maid?->address) }}">
     </label>
     <label class="field">
         <span>Partner</span>
         <select name="partner_id">
             <option value="">Unassigned</option>
             @foreach ($partners as $part)
                 <option value="{{ $part->id }}" @selected((int) old('partner_id', $maid?->partner_id) === (int) $part->id)>
                     {{ "{$part->name} - ".($part->governorate?->name ?? 'Unassigned governorate') }}</option>
             @endforeach
         </select>
     </label>
     <label class="field">
         <span>Gender</span>
         <select name="gender">
             @foreach (['male', 'female'] as $gender)
                 <option value="{{ $gender }}" @selected(old('gender', $maid?->gender ?? 'male') === $gender)>{{ str($gender)->title() }}</option>
             @endforeach
         </select>
     </label>
     <label class="field">
         <span>Off Day</span>
         <select name="off_day">
             @foreach (days_human() as $day)
                 <option value="{{ $day['value'] }}" @selected(old('off_day', $maid?->off_day) === $day['value'])>{{ str($day['name'])->title() }}
                 </option>
             @endforeach
         </select>
     </label>
     <label class="field">
         <span>Salary</span>
         <input name="salary" value="{{ old('salary', $maid?->salary) }}" placeholder="Monthly Salary">
     </label>
     <div class="form-section-heading wide"><p class="eyebrow">Documents</p><h3>Compliance and attachment setup</h3></div>
     <label class="field"><span>Personal ID</span><input name="personal_id" value="{{ old('personal_id', $maid?->personal_id) }}" placeholder="National identification number"></label>
     <label class="field"><span>Document type</span><select name="doc_type"><option value="">Select document type</option>@foreach(['personal_id' => 'Personal ID', 'contract' => 'Contract', 'medical_report' => 'Medical report', 'police_clearance' => 'Police clearance', 'training_certificate' => 'Training certificate', 'profile_photo' => 'Profile photo', 'other' => 'Other'] as $type => $label)<option value="{{ $type }}" @selected(old('doc_type', $maid?->doc_type) === $type)>{{ $label }}</option>@endforeach</select></label>
     <label class="field wide"><span>Attachment</span><input name="attachment" type="file" accept="image/*,.pdf,.doc,.docx"><small class="field-hint">Identity or onboarding document linked to this maid profile.</small></label>
 </div>

 <div class="mt-2">
     <label class="field">
         <span>Notes</span>
         <textarea name="notes">{{ old('notes', $maid?->notes) }}</textarea>
     </label>
 </div>
 <div class="form-actions catalog-form-actions">
     <a class="ui-button ghost" href="{{ url()->previous() }}">Cancel</a>
     <button class="ui-button primary" type="submit">Save Maid</button>
 </div>

 @push('scripts')
     <script>
         const tabButtons = document.querySelectorAll(".tab-btn");
         const tabPanels = document.querySelectorAll(".tab-panel");

         function setActiveTab(targetId) {
             tabButtons.forEach((button) => {
                 button.classList.toggle(
                     "active",
                     button.dataset.tab === targetId,
                 );
             });

             tabPanels.forEach((panel) => {
                 panel.classList.toggle("active", panel.id === targetId);
             });
         }

         tabButtons.forEach((button) => {
             button.addEventListener("click", () =>
                 setActiveTab(button.dataset.tab),
             );
         });
     </script>
 @endpush
