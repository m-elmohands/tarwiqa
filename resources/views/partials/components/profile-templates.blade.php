<template id="profileInfoRowTemplate">
    <p class="profile-info-row"><strong data-field="label"></strong> <span data-field="value"></span></p>
</template>

<template id="profileAddressRowTemplate">
    <tr>
        <td data-field="id"></td>
        <td data-field="governorate"></td>
        <td data-field="location"></td>
        <td data-field="streetName"></td>
        <td data-field="building"></td>
        <td data-field="unit"></td>
        <td data-field="notes"></td>
        <td>
            <div class="table-actions">
                <button class="table-action-btn view" type="button" data-address-action="view">View</button>
                <button class="table-action-btn edit" type="button" data-address-action="edit">Edit</button>
                <button class="table-action-btn delete" type="button" data-address-action="delete">Delete</button>
            </div>
        </td>
    </tr>
</template>
