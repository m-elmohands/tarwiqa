# TARWIQA database schema specification

Last synchronized: 2026-08-24

This document describes the intended fresh-install database schema. Edit this file—or reference a table and field from it—when requesting migration changes. After migration changes are implemented, this document should be synchronized again.

## Change-request format

Use any concise format, for example:

```text
Table: services
- Rename subtitle to short_description
- Make city_id required
- Add tax_rate decimal(5,2), default 0
- Change city deletion from SET NULL to RESTRICT
```

Notation:

- `PK` — primary key
- `FK table.column` — foreign key target
- `UQ` — unique constraint
- `IDX` — index
- `NULL` — nullable
- `DEFAULT value` — database default
- `CASCADE`, `SET NULL`, `RESTRICT` — action when the referenced row is deleted
- `timestamps` — `created_at`, `updated_at`
- `softDeletes` — nullable `deleted_at`

## Migration order

1. `0001_01_01_000000_create_users_table.php`
2. `0001_01_01_000001_create_cache_table.php`
3. `0001_01_01_000002_create_jobs_table.php`
4. `2026_08_23_000100_create_access_and_locations_tables.php`
5. `2026_08_23_000200_create_catalog_and_workforce_tables.php`
6. `2026_08_23_000300_create_orders_and_finance_tables.php`
7. `2026_08_23_000400_create_communications_and_governance_tables.php`
8. `2026_08_23_134025_create_media_table.php`
9. `2026_09_03_000000_create_social_accounts_table.php`
10. `2026_09_21_125127_add_platform_column_users_table.php`
11. `2026_09_22_081921_create_maids_table.php`
12. `2026_09_22_082036_create_ads_table.php`
13. `2026_09_22_083357_create_locations_table.php`
14. `2026_09_22_113912_add_location_in_addresses_table.php`
15. `2026_10_04_000100_add_super_admin_operational_domains.php`

## Users and framework

### users

```text
id                  bigint PK
uuid                uuid UQ
city_id             bigint NULL FK cities.id SET NULL
name                varchar
username            varchar NULL UQ
email               varchar UQ
phone               varchar(30) NULL UQ
gender              varchar(10) NULL
dob                 date NULL
role                varchar(30) DEFAULT customer IDX
status              varchar(30) DEFAULT active IDX
email_verified_at   timestamp NULL
phone_verified_at   timestamp NULL
password            varchar
locale              varchar(10) DEFAULT en
timezone            varchar(50) DEFAULT Africa/Cairo
last_login_at       timestamp NULL
last_active_at      timestamp NULL
banned_at           timestamp NULL
ban_reason          text NULL
settings            json NULL
remember_token      varchar(100) NULL
timestamps
softDeletes
```

### password_reset_tokens

```text
email       varchar PK
token       varchar
created_at  timestamp NULL
```

### sessions

```text
id             varchar PK
user_id        bigint NULL IDX (not constrained)
ip_address     varchar(45) NULL
user_agent     text NULL
payload        longtext
last_activity  integer IDX
```

### cache

```text
key         varchar PK
value       mediumtext
expiration  bigint IDX
```

### cache_locks

```text
key         varchar PK
owner       varchar
expiration  bigint IDX
```

### jobs

```text
id            bigint PK
queue         varchar IDX
payload       longtext
attempts      unsigned smallint
reserved_at   unsigned integer NULL
available_at  unsigned integer
created_at    unsigned integer
```

### job_batches

```text
id              varchar PK
name            varchar
total_jobs      integer
pending_jobs    integer
failed_jobs     integer
failed_job_ids  longtext
options         mediumtext NULL
cancelled_at    integer NULL
created_at      integer
finished_at     integer NULL
```

### failed_jobs

```text
id          bigint PK
uuid        varchar UQ
connection  varchar
queue       varchar
payload     longtext
exception   longtext
failed_at   timestamp DEFAULT current_timestamp
INDEX(connection, queue, failed_at)
```

## Access control and locations

### permissions

```text
id          bigint PK
key         varchar UQ
group       varchar IDX
label       varchar
timestamps
```

### role_permissions

```text
id             bigint PK
role           varchar(30) IDX
permission_id  bigint FK permissions.id CASCADE
can_view       boolean DEFAULT true
can_create     boolean DEFAULT false
can_update     boolean DEFAULT false
can_delete     boolean DEFAULT false
can_export     boolean DEFAULT false
timestamps
UNIQUE(role, permission_id)
```

### user_permissions

```text
id             bigint PK
user_id        bigint FK users.id CASCADE
permission_id  bigint FK permissions.id CASCADE
allowed        boolean DEFAULT true
abilities      json NULL
timestamps
UNIQUE(user_id, permission_id)
```

### cities

```text
id          bigint PK
name        varchar UQ
name_ar     varchar NULL
is_active   boolean DEFAULT true IDX
timestamps
softDeletes
```

Cities remain available for service availability. Governorates and areas provide the operational coverage hierarchy used by partner and supporter workspaces.

### addresses

```text
id             bigint PK
user_id        bigint FK users.id CASCADE
city_id        bigint NULL FK cities.id SET NULL
label          varchar DEFAULT Home
contact_name   varchar NULL
contact_phone  varchar(30) NULL
street         varchar
building       varchar NULL
floor          varchar NULL
apartment      varchar NULL
landmark       text NULL
is_default     boolean DEFAULT false
timestamps
softDeletes
```

## Workforce and catalog

### governorates

```text
id          bigint PK
name        varchar UQ
name_ar     varchar NULL
is_active   boolean DEFAULT true IDX
timestamps
softDeletes
```

### areas

```text
id              bigint PK
governorate_id  bigint FK governorates.id CASCADE
name            varchar
name_ar         varchar NULL
is_active       boolean DEFAULT true IDX
timestamps
softDeletes
UNIQUE(governorate_id, name)
```

### user_governorates and partner_areas

These pivot tables assign supporter users to governorates and partner users to operating areas. Both enforce unique user/scope pairs.

### extras and order_extras

`extras` stores reusable order add-ons with pricing and publication status. `order_extras` stores immutable name, quantity, unit price, and total snapshots for each order.

### maid_documents and maid_availability

`maid_documents` stores multiple onboarding documents and verification state per maid. `maid_availability` stores one weekly availability row per maid and day of week.

### app_shares

Stores app-share events, platform/campaign attribution, referral codes, and conversion counts.

### service_types

```text
id          bigint PK
title       varchar
subtitle    varchar NULL
slug        varchar UQ
is_active   boolean DEFAULT true IDX
timestamps
softDeletes
```

Media Library: single-file `logo` collection; JPEG, PNG, WebP, or SVG; `thumb` conversion at 320×320.

### service_categories

```text
id              bigint PK
type_id     bigint NULL FK service_types.id SET NULL
title           varchar
subtitle        varchar NULL
slug            varchar UQ
is_active       boolean DEFAULT true IDX
timestamps
softDeletes
```

Media Library: single-file `logo` collection; JPEG, PNG, WebP, or SVG; `thumb` conversion at 320×320.

### services

```text
id                bigint PK
category_id       bigint NULL FK service_categories.id SET NULL
city_id           bigint NULL FK cities.id SET NULL
title             varchar
slug              varchar UQ
description       text NULL
base_price        decimal(12,2) DEFAULT 0
is_active         boolean DEFAULT true IDX
timestamps
softDeletes
```

Media Library: single-file `logo` collection; JPEG, PNG, WebP, or SVG; `thumb` conversion at 320×320.

### products

```text
id                bigint PK
category_id       bigint NULL FK service_categories.id SET NULL
city_id           bigint NULL FK cities.id SET NULL
title             varchar
slug              varchar UQ
description       text NULL
youtube_url       text NULL
base_price        decimal(12,2) DEFAULT 0
is_active         boolean DEFAULT true IDX
timestamps
softDeletes
```

Media Library: single-file `logo` collection; JPEG, PNG, or WebP; `thumb` conversion at 320×320.
`city_id = NULL` means the service is available in all cities.

### packages

```text
id                bigint PK
title              varchar
slug              varchar UQ
description       text NULL
price             decimal(12,2)
discount_value    decimal(12,2) DEFAULT 0
discount_type     varchar(20) DEFAULT fixed
is_active         boolean DEFAULT true IDX
starts_at         timestamp NULL
ends_at           timestamp NULL
timestamps
softDeletes
```

### package_services

```text
id          bigint PK
package_id  bigint FK packages.id CASCADE
service_id  bigint FK services.id CASCADE
quantity    unsigned integer DEFAULT 1
unit_price  decimal(12,2) NULL
timestamps
UNIQUE(package_id, service_id)
```

## Orders and finance

### orders

```text
id                   bigint PK
customer_id          bigint FK users.id RESTRICT
address_id           bigint NULL FK addresses.id SET NULL
package_id           bigint NULL FK packages.id SET NULL
status               varchar(40) DEFAULT under_review IDX
service_date         date IDX
arrival_time         time NULL
duration_minutes     unsigned integer NULL
payment_method       varchar(30) NULL IDX
payment_status       varchar(30) DEFAULT unpaid IDX
subtotal             decimal(12,2) DEFAULT 0
extras_total         decimal(12,2) DEFAULT 0
discount_total       decimal(12,2) DEFAULT 0
wallet_amount        decimal(12,2) DEFAULT 0
deposit_amount       decimal(12,2) DEFAULT 0
tax_total            decimal(12,2) DEFAULT 0
total                decimal(12,2) DEFAULT 0
customer_notes       text NULL
internal_notes       text NULL
additional_phone     text NULL
accepted_at          timestamp NULL
started_at           timestamp NULL
completed_at         timestamp NULL
cancelled_at         timestamp NULL
cancellation_reason  varchar NULL
created_by           bigint NULL FK users.id SET NULL
timestamps
softDeletes
INDEX(service_date, status)
```

### order_services

```text
id          bigint PK
order_id    bigint FK orders.id CASCADE
service_id  bigint NULL FK services.id SET NULL
product_id  bigint NULL FK products.id SET NULL
name        varchar
type        varchar(30) DEFAULT service
quantity    unsigned integer DEFAULT 1
unit_price  decimal(12,2)
total       decimal(12,2)
metadata    json NULL
timestamps
```

### order_status_history

```text
id           bigint PK
order_id     bigint FK orders.id CASCADE
from_status  varchar(40) NULL
to_status    varchar(40) IDX
note         text NULL
changed_by   bigint NULL FK users.id SET NULL
timestamps
```

### order_issues

```text
id           bigint PK
order_id     bigint FK orders.id CASCADE
reported_by  bigint NULL FK users.id SET NULL
type         varchar(50) IDX
priority     varchar(20) DEFAULT normal IDX
status       varchar(30) DEFAULT open IDX
details      text
resolved_by  bigint NULL FK users.id SET NULL
resolved_at  timestamp NULL
resolution   text NULL
timestamps
```

### order_reviews

```text
id            bigint PK
order_id      bigint FK orders.id CASCADE
customer_id   bigint FK users.id CASCADE
maid_id       bigint NULL FK maids.id SET NULL
rating        unsigned tinyint
comment       text NULL
status        varchar(30) DEFAULT published IDX
moderated_by  bigint NULL FK users.id SET NULL
moderated_at  timestamp NULL
timestamps
UNIQUE(order_id, customer_id)
```

### social_accounts

```text
id                bigint PK
user_id           bigint FK users.id CASCADE
provider          enum(google, apple, facebook) IDX
provider_user_id  varchar
provider_email    varchar NULL
timestamps

UNIQUE(provider, provider_user_id)
UNIQUE(user_id, provider)
```

### wallets

```text
id              bigint PK
user_id         bigint UQ FK users.id CASCADE
balance         decimal(14,2) DEFAULT 0
locked_balance  decimal(14,2) DEFAULT 0
currency        varchar(3) DEFAULT EGP
timestamps
```

### wallet_transactions

```text
id             bigint PK
reference      uuid UQ
wallet_id      bigint FK wallets.id CASCADE
order_id       bigint NULL FK orders.id SET NULL
type           enum(deposit, withdrawal, purchase) IDX
amount         decimal(14,2)
balance_after  decimal(14,2)
status         varchar(30) DEFAULT completed IDX
description    text NULL
created_by     bigint NULL FK users.id SET NULL
metadata       json NULL
timestamps
```

### payments

```text
id                  bigint PK
order_id            bigint FK orders.id CASCADE
user_id             bigint FK users.id RESTRICT
provider            varchar NULL
method              varchar(30)
provider_reference  varchar NULL IDX
amount              decimal(14,2)
currency            varchar(3) DEFAULT EGP
status              varchar(30) DEFAULT pending IDX
paid_at             timestamp NULL
failed_at           timestamp NULL
metadata            json NULL
timestamps
```

### refunds

```text
id            bigint PK
reference     varchar UQ
payment_id    bigint FK payments.id RESTRICT
amount        decimal(14,2)
status        varchar(30) DEFAULT pending IDX
reason        text NULL
approved_by   bigint NULL FK users.id SET NULL
processed_at  timestamp NULL
timestamps
```

## Communication and governance

### conversations

```text
id               bigint PK
type             varchar(30) DEFAULT direct IDX
subject          varchar NULL
order_id         bigint NULL FK orders.id SET NULL
created_by       bigint NULL FK users.id SET NULL
last_message_at  timestamp NULL IDX
timestamps
```

### conversation_participants

```text
id               bigint PK
conversation_id  bigint FK conversations.id CASCADE
user_id          bigint FK users.id CASCADE
last_read_at     timestamp NULL
archived_at      timestamp NULL
timestamps
UNIQUE(conversation_id, user_id)
```

### messages

```text
id               bigint PK
conversation_id  bigint FK conversations.id CASCADE
sender_id        bigint NULL FK users.id SET NULL
reply_to_id      bigint NULL FK messages.id SET NULL
body             text
type             varchar(30) DEFAULT text
metadata         json NULL
edited_at        timestamp NULL
timestamps
softDeletes
```

### message_attachments

```text
id         bigint PK
message_id bigint FK messages.id CASCADE
name       varchar
path       varchar
mime_type  varchar NULL
size       unsigned bigint NULL
timestamps
```

### notifications

```text
id               uuid PK
type             varchar
notifiable_type  varchar IDX (polymorphic)
notifiable_id    unsigned bigint IDX (polymorphic)
data             text
read_at          timestamp NULL
timestamps
```

### inquiry_logs

```text
id           bigint PK
user_id      bigint NULL FK users.id SET NULL
type         varchar(50) IDX
channel      varchar(30) NULL IDX
status       varchar(30) DEFAULT open IDX
subject      varchar
details      text NULL
assigned_to  bigint NULL FK users.id SET NULL
resolved_at  timestamp NULL
timestamps
```

### approval_requests

```text
id               bigint PK
type             varchar(50) IDX
subject          varchar
approvable_type  varchar NULL IDX (polymorphic)
approvable_id    unsigned bigint NULL IDX (polymorphic)
requested_by     bigint NULL FK users.id SET NULL
priority         varchar(20) DEFAULT normal IDX
status           varchar(30) DEFAULT pending IDX
before_data      json NULL
after_data       json NULL
reason           text NULL
evidence_path    varchar NULL
decided_by       bigint NULL FK users.id SET NULL
decided_at       timestamp NULL
decision_note    text NULL
timestamps
```

### audit_logs

```text
id              bigint PK
user_id         bigint NULL FK users.id SET NULL
event           varchar(60) IDX
auditable_type  varchar NULL IDX (polymorphic)
auditable_id    unsigned bigint NULL IDX (polymorphic)
description     text NULL
old_values      json NULL
new_values      json NULL
ip_address      varchar(45) NULL
user_agent      text NULL
timestamps
INDEX(user_id, created_at)
```

### faqs

```text
id          bigint PK
question    varchar (unique by application validation)
answer      text
audience    varchar(30) DEFAULT all IDX (all, customer, partner, supporter)
sort_order  unsigned integer DEFAULT 0 IDX
is_active   boolean DEFAULT true IDX
timestamps
softDeletes
```

## Spatie Media Library

### media

```text
id                     bigint PK
model_type             varchar IDX (polymorphic)
model_id               unsigned bigint IDX (polymorphic)
uuid                   uuid NULL UQ
collection_name        varchar
name                   varchar
file_name              varchar
mime_type              varchar NULL
disk                   varchar
conversions_disk       varchar NULL
size                   unsigned bigint
manipulations          json
custom_properties      json
generated_conversions  json
responsive_images      json
order_column           unsigned integer NULL IDX
created_at             timestamp NULL
updated_at             timestamp NULL
```

## Migration-editing policy

- For an unreleased or disposable development database, update these baseline migrations and run `php artisan migrate:fresh --seed`.
- For a database where migrations have already run, create a new forward migration; do not edit recorded migrations retroactively.
- Always update models, validation, repositories/services, DataTables columns, seeders, views, tests, and this document when a schema field changes.
- Check foreign-key creation and rollback order before applying migrations.
