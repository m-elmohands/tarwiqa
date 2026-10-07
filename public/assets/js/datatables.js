const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || "";

/* ---------------------------------------------------------------------- */
/* Small DOM helpers — reused by every table's column renderers           */
/* ---------------------------------------------------------------------- */

const money = (value) => {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return "—";
    }

    return `EGP ${amount.toLocaleString("en-EG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

const strong = (text) => {
    const el = document.createElement("strong");
    el.textContent = text ?? "—";
    return el;
};

const statusPill = (label, className) => {
    const el = document.createElement("span");
    el.className = `status-pill ${className}`;
    el.textContent = label ?? "—";
    return el;
};

// shorthand for the common "active / inactive" boolean case
const activePill = (label, isActive) =>
    statusPill(
        label,
        isActive ? "active" : "inactive"
    );

const reviewStatusCell = (row) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = row.status_update_url || "#";
    form.className = "inline-form";

    const token = document.createElement("input");
    token.type = "hidden";
    token.name = "_token";
    token.value = csrfToken;

    const method = document.createElement("input");
    method.type = "hidden";
    method.name = "_method";
    method.value = "PATCH";

    const select = document.createElement("select");
    select.name = "status";
    select.setAttribute("aria-label", "Review status");

    for (const status of ["pending", "published", "rejected"]) {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status.replace(/^./, (letter) => letter.toUpperCase());
        option.selected = row.status === status;
        select.append(option);
    }

    select.addEventListener("change", () => form.submit());
    form.append(token, method, select);

    return form;
};

const identityCell = (title, subtitle, logoUrl, href) => {
    const wrap = document.createElement("div");
    wrap.className = "service-name-cell";

    if (logoUrl) {
        const img = document.createElement("img");
        img.src = logoUrl;
        img.alt = "";
        img.loading = "lazy";
        wrap.append(img);
    }

    const copy = document.createElement("span");

    const title_ = href
        ? document.createElement("a")
        : document.createElement("strong");

    if (href) {
        title_.href = href;
        title_.style.cssText =
            "text-decoration: none; color: var(--accent-strong); font-weight: 800;";
    }

    title_.textContent = title ?? "—";

    const sub = document.createElement("small");
    sub.textContent = subtitle || "—";

    copy.append(title_, sub);
    wrap.append(copy);

    return wrap;
};

const actionCell = (row, label) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-actions";

    /*
     * View
     */
    if (row.view_url) {
        const view = document.createElement("a");

        view.className = "table-action-btn view";
        view.href = row.view_url;
        view.textContent = "View";

        wrapper.append(view);
    }

    /*
     * Edit
     */
    if (row.edit_url) {
        const edit = document.createElement("a");

        edit.className = "table-action-btn edit";
        edit.href = row.edit_url;
        edit.textContent = "Edit";

        wrapper.append(edit);
    }

    /*
     * Delete
     */
    if (row.delete_url) {
        const form = document.createElement("form");

        form.method = "POST";
        form.action = row.delete_url;

        const token = document.createElement("input");

        token.type = "hidden";
        token.name = "_token";
        token.value = csrfToken;

        const method = document.createElement("input");

        method.type = "hidden";
        method.name = "_method";
        method.value = "DELETE";

        const remove = document.createElement("button");

        remove.className = "table-action-btn delete";
        remove.type = "submit";
        remove.dataset.confirm = `Delete ${label || "this record"}?`;
        remove.textContent = "Delete";

        form.append(token, method, remove);
        wrapper.append(form);
    }

    return wrapper;
};

/* ---------------------------------------------------------------------- */
/* Table config — THE place to add/remove/reorder a table's columns.      */
/* Each column is { key, render(row), className?, searchable?, orderable? } */
/* `key` must match the Yajra column name on the backend.                 */
/* ---------------------------------------------------------------------- */

const TABLES = {

    /* ------------------------------------------------------------------ */
    /* Cities                                                             */
    /* ------------------------------------------------------------------ */

    cities: {
        empty: [
            "No cities found",
            "Add a city or adjust the current search."
        ],

        columns: [
            {
                key: "name",
                render: (r) => strong(r.name)
            },

            {
                key: "name_ar",
                className: "rtl-cell",
                render: (r) => r.name_ar || "—"
            },

            {
                key: "users_count",
                orderable: true,
                render: (r) => String(r.users_count ?? 0)
            },

            {
                key: "status_label",
                render: (r) =>
                    activePill(
                        r.status_label,
                        r.is_active
                    )
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.name)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Services                                                           */
    /* ------------------------------------------------------------------ */

    services: {
        empty: [
            "No services found",
            "Create a service or change the selected filters."
        ],

        columns: [
            {
                key: "title",
                render: (r) =>
                    identityCell(
                        r.title,
                        r.subtitle || r.slug,
                        r.logo_url
                    )
            },

            {
                key: "category_title",
                render: (r) => r.category_title || "—"
            },

            {
                key: "governorate_name",
                render: (r) => r.city_name || "—"
            },

            {
                key: "base_price",
                render: (r) => money(r.base_price)
            },

            {
                key: "status_label",
                render: (r) =>
                    activePill(
                        r.status_label,
                        r.is_active
                    )
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.title)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Products                                                           */
    /* ------------------------------------------------------------------ */

    products: {
        empty: [
            "No products found",
            "Create a product or change the selected filters."
        ],

        get columns() {
            return TABLES.services.columns;
        },
    },

    /* ------------------------------------------------------------------ */
    /* Service Types                                                      */
    /* ------------------------------------------------------------------ */

    "service-types": {
        empty: [
            "No service types found",
            "Create a type to organize your service catalog."
        ],

        columns: [
            {
                key: "title",
                render: (r) =>
                    identityCell(
                        r.title,
                        r.slug
                    )
            },

            {
                key: "subtitle",
                render: (r) => r.subtitle || "—"
            },

            {
                key: "status_label",
                render: (r) =>
                    activePill(
                        r.status_label,
                        r.is_active
                    )
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.title)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Service Categories                                                 */
    /* ------------------------------------------------------------------ */

    "service-categories": {
        empty: [
            "No categories found",
            "Create a category or adjust the current search."
        ],

        columns: [
            {
                key: "title",
                render: (r) =>
                    identityCell(
                        r.title,
                        r.slug
                    )
            },

            {
                key: "type_title",
                render: (r) => r.type_title || "—"
            },

            {
                key: "subtitle",
                render: (r) => r.subtitle || "—"
            },

            {
                key: "status_label",
                render: (r) =>
                    activePill(
                        r.status_label,
                        r.is_active
                    )
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.title)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Packages                                                           */
    /* ------------------------------------------------------------------ */

    packages: {
        empty: [
            "No packages found",
            "Create a package or adjust the current search."
        ],

        columns: [
            {
                key: "title",
                render: (r) =>
                    identityCell(
                        r.title,
                        r.slug
                    )
            },

            {
                key: "price",
                render: (r) => money(r.price)
            },

            {
                key: "discount_value",
                render: (r) =>
                    `${r.discount_value ?? 0} ${
                        r.discount_type === "percentage"
                            ? "%"
                            : "EGP"
                    }`,
            },

            {
                key: "status_label",
                render: (r) =>
                    activePill(
                        r.status_label,
                        r.is_active
                    )
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.title)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Customers                                                          */
    /* ------------------------------------------------------------------ */

    customers: {
        empty: [
            "No customers found",
            "Add an account or adjust the current search."
        ],

        /*
         * Default server-side ordering.
         *
         * This corresponds to:
         * ORDER BY created_at DESC
         */
        order: {
            column: "created_at",
            direction: "desc"
        },

        columns: [

            /* ---------------------------------------------------------- */
            /* Select All / Row Checkbox                                  */
            /* ---------------------------------------------------------- */

            // {
            //     key: "select_all",
            //     searchable: false,
            //     orderable: false,
            //     className: "text-center",

            //     render: (r) => {
            //         const checkbox =
            //             document.createElement("input");

            //         checkbox.type = "checkbox";
            //         checkbox.className = "user-checkbox";
            //         checkbox.value = r.select_all;

            //         checkbox.setAttribute(
            //             "aria-label",
            //             `Select user ${r.id}`
            //         );

            //         return checkbox;
            //     }
            // },

            /* ---------------------------------------------------------- */
            /* ID                                                           */
            /* ---------------------------------------------------------- */

            {
                key: "id",
                searchable: false,
                orderable: true,

                render: (r) =>
                    r.id != null
                        ? `#${r.id}`
                        : "—"
            },

            /* ---------------------------------------------------------- */
            /* Name                                                          */
            /* ---------------------------------------------------------- */

            {
                key: "name",

                render: (r) =>
                    identityCell(
                        r.name,
                        r.email,
                        null,
                        r.view_url
                    )
            },

            /* ---------------------------------------------------------- */
            /* Phone                                                         */
            /* ---------------------------------------------------------- */

            {
                key: "phone",

                render: (r) =>
                    r.phone || "—"
            },

            /* ---------------------------------------------------------- */
            /* City                                                          */
            /* ---------------------------------------------------------- */

            {
                key: "city_name",

                render: (r) =>
                    r.governorate_name || "Unassigned"
            },

            /* ---------------------------------------------------------- */
            /* Platform                                                      */
            /* ---------------------------------------------------------- */

            {
                key: "platform",

                render: (r) =>
                    r.platform || "Android"
            },

            /* ---------------------------------------------------------- */
            /* Active Status                                                 */
            /* ---------------------------------------------------------- */

            {
                key: "is_active",

                render: (r) =>
                    activePill(
                        r.status == 'active'
                            ? "Active"
                            : "Inactive",
                        r.status == 'active'
                    )
            },

            /* ---------------------------------------------------------- */
            /* Ban                                                           */
            /* ---------------------------------------------------------- */

            {
                key: "is_banned",

                render: (r) =>
                    statusPill(
                        r.status == 'banned' | r.status == 'susbended'
                            ? "Banned"
                            : "Clean",
                        r.status == 'banned' | r.status == 'susbended'
                            ? "inactive"
                            : "active"
                    )
            },

            /* ---------------------------------------------------------- */
            /* Restricted                                                    */
            /* ---------------------------------------------------------- */

            {
                key: "is_restricted",

                render: (r) =>
                    statusPill(
                        r.status == 'inactive'
                            ? "Restricted"
                            : "Normal",
                        r.status == 'inactive'
                            ? "inactive"
                            : "active"
                    )
            },

            /* ---------------------------------------------------------- */
            /* Created Date                                                  */
            /* ---------------------------------------------------------- */

            {
                key: "created_at",
                orderable: true,

                render: (r) =>
                    r.created_at || "—"
            },

            /* ---------------------------------------------------------- */
            /* Actions                                                       */
            /* ---------------------------------------------------------- */

            {
                key: "actions",
                searchable: false,
                orderable: false,
                className: "text-center",

                render: (r) =>
                    actionCell(
                        r,
                        r.name
                    )
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Partners                                                           */
    /* ------------------------------------------------------------------ */

    partners: {
        empty: [
            "No partners found",
            "Add an account or adjust the current search."
        ],

        /*
         * Default server-side ordering.
         *
         * This corresponds to:
         * ORDER BY created_at DESC
         */
        order: {
            column: "created_at",
            direction: "desc"
        },

        columns: [

            /* ---------------------------------------------------------- */
            /* Name                                                          */
            /* ---------------------------------------------------------- */

            {
                key: "name",
                orderable: true,

                render: (r) =>
                    identityCell(
                        r.name,
                        `${r.username ?? r.email}/OP-${r.id}`,
                        null,
                        r.view_url
                    )
            },

            /* ---------------------------------------------------------- */
            /* Active Status                                                 */
            /* ---------------------------------------------------------- */

            {
                key: "status",

                render: (r) =>
                    activePill(
                        r.status == 'active'
                            ? "Active"
                            : "Inactive",
                        r.status == 'active'
                    )
            },

            /* ---------------------------------------------------------- */
            /* City                                                          */
            /* ---------------------------------------------------------- */

            {
                key: "governorate_name",
                orderable: true,

                render: (r) =>
                    r.governorate_name || "Unassigned"
            },

            /* ---------------------------------------------------------- */
            /* Worked Zone                                                */
            /* ---------------------------------------------------------- */

            {
                key: "location_name",
                orderable: true,

                render: (r) =>
                    r.location_name || "Unassigned"
            },

            /* ---------------------------------------------------------- */
            /* Restricted                                                    */
            /* ---------------------------------------------------------- */

            {
                key: "maids_count",

                render: (r) =>
                    r.maids_count || "0"
            },

            /* ---------------------------------------------------------- */
            /* Created Date                                                  */
            /* ---------------------------------------------------------- */

            {
                key: "completed_orders",

                render: (r) =>
                    r.completed_orders || "0"
            },

            /* ---------------------------------------------------------- */
            /* Actions                                                       */
            /* ---------------------------------------------------------- */

            {
                key: "actions",
                searchable: false,
                orderable: false,
                className: "text-center",

                render: (r) =>
                    actionCell(
                        r,
                        r.name
                    )
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Supporters                                                         */
    /* ------------------------------------------------------------------ */

    supporters: {
        empty: [
            "No supporters found",
            "Add an account or adjust the current search."
        ],

        /*
         * Default server-side ordering.
         *
         * This corresponds to:
         * ORDER BY created_at DESC
         */
        order: {
            column: "created_at",
            direction: "desc"
        },

        columns: [
            {
                key: "name",
                orderable: true,

                render: (r) =>
                    identityCell(
                        r.name,
                        `${r.username ?? r.email}/SUP-${r.id}`,
                        null,
                        r.view_url
                    )
            },
            {
                key: "status",

                render: (r) =>
                    activePill(
                        r.status == 'active'
                            ? "Active"
                            : "Inactive",
                        r.status == 'active'
                    )
            },
            {
                key: "access_role",
                orderable: true,

                render: (r) =>
                    r.access_role || "Viewer"
            },
            {
                key: "assign_governorates",

                render: (r) =>
                    r.assign_governorates || "None"
            },
            {
                key: "partners_access",

                render: (r) =>
                    r.partners_access || "Not Allowed"
            },
            {
                key: "scoped_orders",

                render: (r) =>
                    r.scoped_orders || "0"
            },
            {
                key: "scoped_partners",

                render: (r) =>
                    r.scoped_partners || "0"
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                className: "text-center",

                render: (r) =>
                    actionCell(
                        r,
                        r.name
                    )
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Maids                                                              */
    /* ------------------------------------------------------------------ */

    maids: {
        empty: [
            "No maids found",
            "Add a maid or adjust the current search."
        ],

        columns: [
            {
                key: "name",
                render: (r) => identityCell(r.name, r.id || "—", null, r.view_url)
            },
            {
                key: "phone",
                render: (r) => r.phone || "—"
            },
            {
                key: "status",
                render: (r) =>
                    activePill(
                        r.status,
                        r.status === "active"
                    )
            },
            { key: "gender", render: (r) => r.gender ? r.gender.charAt(0).toUpperCase() + r.gender.slice(1) : "—" },
            { key: "off_day_label", render: (r) => r.off_day_label || "—" },
            { key: "partner_name", render: (r) => r.partner_name || "Unassigned" },
            { key: "salary", render: (r) => money(r.salary) },
            { key: "done_orders", render: (r) => r.done_orders || "0" },
            { key: "document_status", render: (r) => statusPill(r.document_status || "Missing", r.document_status === "Verified" ? "active" : "pending") },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.name)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* FAQs                                                               */
    /* ------------------------------------------------------------------ */

    faqs: {
        empty: [
            "No FAQs found",
            "Create an FAQ or adjust the current search."
        ],

        columns: [
            {
                key: "question",
                render: (r) => strong(r.question)
            },

            {
                key: "audience_label",
                render: (r) => r.audience_label || "—"
            },

            {
                key: "sort_order",
                render: (r) =>
                    String(r.sort_order ?? 0)
            },

            {
                key: "status_label",
                render: (r) =>
                    activePill(
                        r.status_label,
                        r.is_active
                    )
            },

            {
                key: "actions",
                searchable: false,
                orderable: false,
                render: (r) => actionCell(r, r.question)
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Wallets                                                            */
    /* ------------------------------------------------------------------ */

    wallets: {
        empty: [
            "No wallet activity",
            "Deposits, withdrawals, and purchases will appear here."
        ],

        columns: [
            {
                key: "reference",
                render: (r) => r.reference || "—"
            },

            {
                key: "user_name",
                render: (r) => r.user_name || "—"
            },

            {
                key: "type",
                render: (r) =>
                    statusPill(
                        String(r.type || "—")
                            .replaceAll("_", " "),
                        r.type === "deposit"
                            ? "active"
                            : "inactive"
                    ),
            },

            {
                key: "amount",
                render: (r) =>
                    `${r.type === "deposit" ? "+" : "−"} ${money(r.amount)}`
            },

            {
                key: "balance_after",
                render: (r) =>
                    money(r.balance_after)
            },

            {
                key: "creator_name",
                render: (r) =>
                    r.creator_name || "—"
            },

            {
                key: "created_at_label",
                render: (r) =>
                    r.created_at_label || "—"
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Accepted Orders                                                    */
    /* ------------------------------------------------------------------ */

    "accepted-orders-db": {
        empty: [
            "No accepted orders",
            "Newly accepted bookings will appear here."
        ],

        columns: [
            {
                key: "order_reference",
                render: (r) =>
                    r.order_reference || "—"
            },

            {
                key: "customer_name",
                render: (r) =>
                    r.customer_name || "—"
            },

            {
                key: "partner_name",
                render: (r) =>
                    r.partner_name || "Unassigned"
            },

            {
                key: "city_name",
                render: (r) =>
                    r.city_name || "—"
            },

            {
                key: "service_names",
                render: (r) =>
                    r.service_names || "—"
            },

            {
                key: "package_title",
                render: (r) =>
                    r.package_title || "—"
            },

            {
                key: "service_date_label",
                render: (r) =>
                    r.service_date_label || "—"
            },

            {
                key: "total",
                render: (r) =>
                    money(r.total)
            },

            {
                key: "status_label",
                render: (r) =>
                    statusPill(
                        r.status_label,
                        "pending"
                    )
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Done Orders                                                        */
    /* ------------------------------------------------------------------ */

    "done-orders-db": {
        empty: [
            "No completed orders",
            "Orders appear here after their workflow is completed."
        ],

        columns: [
            {
                key: "order_reference",
                render: (r) =>
                    r.order_reference || "—"
            },

            {
                key: "customer_name",
                render: (r) =>
                    r.customer_name || "—"
            },

            {
                key: "partner_name",
                render: (r) =>
                    r.partner_name || "Unassigned"
            },

            {
                key: "city_name",
                render: (r) =>
                    r.city_name || "—"
            },

            {
                key: "service_names",
                render: (r) =>
                    r.service_names || "—"
            },

            {
                key: "package_title",
                render: (r) =>
                    r.package_title || "—"
            },

            {
                key: "service_date_label",
                render: (r) =>
                    r.service_date_label || "—"
            },

            {
                key: "completed_at_label",
                render: (r) =>
                    r.completed_at_label || "—"
            },

            {
                key: "total",
                render: (r) =>
                    money(r.total)
            },

            {
                key: "status_label",
                render: (r) =>
                    statusPill(
                        r.status_label,
                        "active"
                    )
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Cancelled Orders                                                   */
    /* ------------------------------------------------------------------ */

    "cancelled-orders-db": {
        empty: [
            "No cancelled orders",
            "Cancelled bookings will appear here with their reasons."
        ],

        columns: [
            {
                key: "order_reference",
                render: (r) =>
                    r.order_reference || "—"
            },

            {
                key: "customer_name",
                render: (r) =>
                    r.customer_name || "—"
            },

            {
                key: "partner_name",
                render: (r) =>
                    r.partner_name || "Unassigned"
            },

            {
                key: "city_name",
                render: (r) =>
                    r.city_name || "—"
            },

            {
                key: "service_names",
                render: (r) =>
                    r.service_names || "—"
            },

            {
                key: "service_date_label",
                render: (r) =>
                    r.service_date_label || "—"
            },

            {
                key: "cancelled_at_label",
                render: (r) =>
                    r.cancelled_at_label || "—"
            },

            {
                key: "cancellation_reason_label",
                render: (r) =>
                    r.cancellation_reason_label || "—"
            },

            {
                key: "total",
                render: (r) =>
                    money(r.total)
            },

            {
                key: "status_label",
                render: (r) =>
                    statusPill(
                        r.status_label,
                        "inactive"
                    )
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* Order Reviews                                                      */
    /* ------------------------------------------------------------------ */

    "order-reviews-db": {
        empty: [
            "No reviews found",
            "Published customer feedback will appear here."
        ],

        columns: [
            {
                key: "order_reference",
                render: (r) =>
                    r.order_reference || "—"
            },

            {
                key: "customer_name",
                render: (r) =>
                    r.customer_name || "—"
            },

            {
                key: "service_date",
                render: (r) =>
                    r.service_date || "—"
            },

            {
                key: "rating_label",
                render: (r) =>
                    r.rating_label || "—"
            },

            {
                key: "comment",
                render: (r) =>
                    r.comment || "—"
            },

            {
                key: "status",
                render: (r) => reviewStatusCell(r)
            },
        ],
    },
};

/* ---------------------------------------------------------------------- */
/* Default searchable / orderable columns                                 */
/* ---------------------------------------------------------------------- */

const DEFAULT_SEARCHABLE = new Set([
    "name",
    "name_ar",
    "title",
    "reference",
    "base_price",
    "duration_minutes",
    "question",
    "answer",
    "phone",
    "email",
    "city_name",
    "platform",
    "customer_name",
    "user_name",
    "service_names",
    "package_title",
    "order_reference",
]);

const DEFAULT_ORDERABLE = new Set([
    "id",
    "name",
    "title",
    "reference",
    "base_price",
    "price",
    "users_count",
    "sort_order",
    "created_at",
    "created_at_label",
    "service_date",
    "service_date_label",
    "completed_at_label",
    "total",
]);

/* ---------------------------------------------------------------------- */
/* Generic rendering — no table-specific branching from here down         */
/* ---------------------------------------------------------------------- */

const renderTableState = (
    body,
    columns,
    kind,
    state
) => {
    const row = document.createElement("tr");

    row.className = "datatable-state-row";

    const cell = document.createElement("td");

    cell.colSpan = columns.length;

    const widget = document.createElement("div");

    widget.className = `datatable-state ${state}`;

    widget.setAttribute(
        "role",
        state === "error"
            ? "alert"
            : "status"
    );

    const icon = document.createElement("span");

    icon.className = "datatable-state-icon";

    icon.setAttribute(
        "aria-hidden",
        "true"
    );

    icon.innerHTML =
        state === "loading"
            ? "<i></i><i></i><i></i>"
            : state === "error"
                ? '<svg viewBox="0 0 24 24"><path d="M12 8v5M12 17h.01"/><path d="M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/></svg>'
                : '<svg viewBox="0 0 24 24"><path d="M4 7h16v13H4V7Z"/><path d="M8 4h8v3M8 12h8M9 16h6"/></svg>';

    const copy = document.createElement("span");

    const title = document.createElement("strong");

    const description = document.createElement("small");

    const [
        emptyTitle,
        emptyDescription
    ] =
        TABLES[kind]?.empty ||
        [
            "No records found",
            "Try changing the current search or filters."
        ];

    title.textContent =
        state === "loading"
            ? "Loading records"
            : state === "error"
                ? "Unable to load records"
                : emptyTitle;

    description.textContent =
        state === "loading"
            ? "Fetching the latest data…"
            : state === "error"
                ? "Check your connection and refresh the page to try again."
                : emptyDescription;

    copy.append(
        title,
        description
    );

    widget.append(
        icon,
        copy
    );

    cell.append(widget);

    row.append(cell);

    body.replaceChildren(row);
};

const renderYajraRow = (
    kind,
    row
) => {
    const tr = document.createElement("tr");

    for (
        const column of TABLES[kind].columns
    ) {
        const td = document.createElement("td");

        if (column.className) {
            td.className =
                column.className;
        }

        const content =
            column.render(row);

        if (content instanceof Node) {
            td.append(content);
        } else {
            td.textContent =
                content ?? "—";
        }

        tr.append(td);
    }

    return tr;
};

/* ---------------------------------------------------------------------- */
/* Initialize every Yajra table                                          */
/* ---------------------------------------------------------------------- */

document
    .querySelectorAll("[data-yajra-table]")
    .forEach((table) => {

        const kind =
            table.dataset.kind;

        const tableConfig =
            TABLES[kind];

        const body =
            table.tBodies[0];

        const scope =
            table.closest(".workspace-page");

        if (
            !tableConfig ||
            !body ||
            !scope
        ) {
            return;
        }

        const columnKeys =
            tableConfig.columns.map(
                (c) => c.key
            );

        const search =
            scope.querySelector(
                "[data-table-search]"
            );

        const footer =
            scope.querySelector(
                "[data-table-footer]"
            );

        const state = {
            draw: 0,
            start: 0,
            length: 10,
            search: "",
            page: 1,

            orderColumn:
                tableConfig.order?.column ??
                null,

            orderDirection:
                tableConfig.order?.direction ??
                "asc",
        };

        let debounce;

        let controller = null;

        /* -------------------------------------------------------------- */
        /* Find column index by key                                       */
        /* -------------------------------------------------------------- */

        const getColumnIndex = (key) =>
            tableConfig.columns.findIndex(
                (column) =>
                    column.key === key
            );

        /* -------------------------------------------------------------- */
        /* Load data                                                      */
        /* -------------------------------------------------------------- */

        const load = async () => {

            /*
             * Cancel previous request.
             */
            controller?.abort();

            controller =
                new AbortController();

            /*
             * Increment draw for this request.
             */
            const requestDraw =
                ++state.draw;

            const params =
                new URLSearchParams({
                    draw: String(requestDraw),

                    start:
                        String(state.start),

                    length:
                        String(state.length),

                    "search[value]":
                        state.search,

                    "search[regex]":
                        "false",
                });

            /* ---------------------------------------------------------- */
            /* Columns                                                     */
            /* ---------------------------------------------------------- */

            tableConfig.columns.forEach(
                (column, index) => {

                    const isSearchable =
                        column.searchable ??
                        DEFAULT_SEARCHABLE.has(
                            column.key
                        );

                    const isOrderable =
                        column.orderable ??
                        DEFAULT_ORDERABLE.has(
                            column.key
                        );

                    params.set(
                        `columns[${index}][data]`,
                        column.key
                    );

                    params.set(
                        `columns[${index}][name]`,
                        column.key === "actions"
                            ? ""
                            : column.key
                    );

                    params.set(
                        `columns[${index}][searchable]`,
                        String(isSearchable)
                    );

                    params.set(
                        `columns[${index}][orderable]`,
                        String(isOrderable)
                    );

                    params.set(
                        `columns[${index}][search][value]`,
                        ""
                    );

                    params.set(
                        `columns[${index}][search][regex]`,
                        "false"
                    );
                }
            );

            /* ---------------------------------------------------------- */
            /* Ordering                                                    */
            /* ---------------------------------------------------------- */

            if (
                state.orderColumn !== null
            ) {
                const orderIndex =
                    getColumnIndex(
                        state.orderColumn
                    );

                if (orderIndex >= 0) {
                    params.set(
                        "order[0][column]",
                        String(orderIndex)
                    );

                    params.set(
                        "order[0][dir]",
                        state.orderDirection
                    );
                }
            }

            /* ---------------------------------------------------------- */
            /* Custom filters                                              */
            /* ---------------------------------------------------------- */

            scope
                .querySelectorAll(
                    "[data-table-filter]"
                )
                .forEach((filter) => {

                    params.set(
                        filter.dataset.tableFilter,
                        filter.value
                    );
                });

            /* ---------------------------------------------------------- */
            /* Loading state                                               */
            /* ---------------------------------------------------------- */

            renderTableState(
                body,
                columnKeys,
                kind,
                "loading"
            );

            try {

                const response =
                    await fetch(
                        `${table.dataset.source}?${params.toString()}`,
                        {
                            method: "GET",

                            headers: {
                                Accept:
                                    "application/json",

                                "X-Requested-With":
                                    "XMLHttpRequest",
                            },

                            signal:
                                controller.signal,
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        `Request failed with ${response.status}`
                    );
                }

                const payload =
                    await response.json();

                /*
                 * Ignore stale responses.
                 */
                if (
                    Number(payload.draw) !==
                    requestDraw
                ) {
                    return;
                }

                const rows =
                    Array.isArray(payload.data)
                        ? payload.data
                        : [];

                /* ------------------------------------------------------ */
                /* Render rows                                             */
                /* ------------------------------------------------------ */

                body.replaceChildren(
                    ...rows.map(
                        (row) =>
                            renderYajraRow(
                                kind,
                                row
                            )
                    )
                );

                /* ------------------------------------------------------ */
                /* Empty state                                             */
                /* ------------------------------------------------------ */

                if (!rows.length) {
                    renderTableState(
                        body,
                        columnKeys,
                        kind,
                        "empty"
                    );
                }

                /* ------------------------------------------------------ */
                /* Totals                                                   */
                /* ------------------------------------------------------ */

                const total =
                    scope.querySelector(
                        "[data-table-total]"
                    );

                if (total) {
                    total.textContent =
                        String(
                            payload.recordsTotal ??
                            0
                        );
                }

                scope
                    .querySelector(
                        "[data-table-displayed]"
                    )
                    ?.replaceChildren(
                        String(
                            payload.recordsFiltered ??
                            0
                        )
                    );

                /* ------------------------------------------------------ */
                /* Pagination                                              */
                /* ------------------------------------------------------ */

                const recordsFiltered =
                    Number(
                        payload.recordsFiltered ??
                        0
                    );

                const pages =
                    Math.max(
                        1,
                        Math.ceil(
                            recordsFiltered /
                            state.length
                        )
                    );

                state.page =
                    Math.floor(
                        state.start /
                        state.length
                    ) + 1;

                if (!footer) {
                    return;
                }

                footer.replaceChildren();

                const info =
                    document.createElement(
                        "span"
                    );

                info.textContent =
                    `Page ${state.page} of ${pages} · ${recordsFiltered} records`;

                const controls =
                    document.createElement(
                        "div"
                    );

                for (
                    const [
                        label,
                        delta
                    ] of [
                        ["Previous", -1],
                        ["Next", 1]
                    ]
                ) {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.className =
                        "ui-button ghost";

                    button.type =
                        "button";

                    button.textContent =
                        label;

                    button.disabled =
                        state.page + delta < 1 ||
                        state.page + delta > pages;

                    button.addEventListener(
                        "click",
                        () => {

                            state.start +=
                                delta *
                                state.length;

                            load();
                        }
                    );

                    controls.append(
                        button
                    );
                }

                footer.append(
                    info,
                    controls
                );

            } catch (error) {

                /*
                 * AbortError is expected when a newer
                 * request replaces the previous one.
                 */
                if (
                    error.name ===
                    "AbortError"
                ) {
                    return;
                }

                renderTableState(
                    body,
                    columnKeys,
                    kind,
                    "error"
                );

                console.error(
                    `[TARWIQA:datatable:${kind}]`,
                    error
                );
            }
        };

        /* -------------------------------------------------------------- */
        /* Search                                                         */
        /* -------------------------------------------------------------- */

        search?.addEventListener(
            "input",
            () => {

                clearTimeout(
                    debounce
                );

                debounce =
                    setTimeout(
                        () => {

                            state.search =
                                search.value.trim();

                            state.start =
                                0;

                            load();
                        },
                        250
                    );
            }
        );

        /* -------------------------------------------------------------- */
        /* Filters                                                        */
        /* -------------------------------------------------------------- */

        scope
            .querySelectorAll(
                "[data-table-filter]"
            )
            .forEach(
                (filter) => {

                    filter.addEventListener(
                        "change",
                        () => {

                            state.start =
                                0;

                            load();
                        }
                    );
                }
            );

        /* -------------------------------------------------------------- */
        /* Reset                                                          */
        /* -------------------------------------------------------------- */

        scope
            .querySelector(
                "[data-table-reset]"
            )
            ?.addEventListener(
                "click",
                () => {

                    if (search) {
                        search.value = "";
                    }

                    scope
                        .querySelectorAll(
                            "[data-table-filter]"
                        )
                        .forEach(
                            (filter) => {
                                filter.value = "";
                            }
                        );

                    state.search =
                        "";

                    state.start =
                        0;

                    load();
                }
            );

        /* -------------------------------------------------------------- */
        /* Initial load                                                    */
        /* -------------------------------------------------------------- */

        load();
    });
