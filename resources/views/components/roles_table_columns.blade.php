@if ($role == 'customer')
    <th>ID</th>
    <th>User</th>
    <th>Phone</th>
    <th>City</th>
    <th>Platform</th>
    <th>Active Status</th>
    <th>Ban</th>
    <th>Restricted</th>
    <th>Created Date</th>
@elseif ($role == 'partner')
    <th>Partner Name</th>
    <th>Status</th>
    <th>Governorate</th>
    <th>Work Zone</th>
    <th>Managed Maids</th>
    <th>Completed Orders</th>
@elseif ($role == 'supporter')
    <th>Supporter Name</th>
    <th>Status</th>
    <th>Role</th>
    <th>Assigned Governorates</th>
    <th>Orders Access</th>
    <th>Partners Access</th>
    <th>Scoped Orders</th>
    <th>Scoped Partners</th>
@endif
