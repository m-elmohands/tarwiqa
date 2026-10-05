const partners = [
    {
        id: "OP-1024",
        name: "Mona Adel",
        username: "ops.mona",
        status: "Active",
        governorate: "Cairo",
        zone: "New Cairo",
        managedMaids: 18,
        completedOrders: 246,
    },
    {
        id: "OP-1031",
        name: "Karim Samir",
        username: "ops.karim",
        status: "Active",
        governorate: "Cairo",
        zone: "Nasr City",
        managedMaids: 14,
        completedOrders: 198,
    },
    {
        id: "OP-1057",
        name: "Ahmed Fathy",
        username: "ops.ahmed",
        status: "Offline",
        governorate: "Giza",
        zone: "October",
        managedMaids: 11,
        completedOrders: 176,
    },
];

const partnerOrders = [
    {
        id: "ORD-9401",
        userName: "Mariam Kamal",
        phone: "+20 109 555 0198",
        governorate: "Cairo",
        zone: "New Cairo",
        address: "15 New Cairo First Settlement",
        arrivalDate: "2026-08-12",
        arrivalTime: "08:00 AM",
        offerName: "Premium Deep Clean",
        maids: ["Hoda Ali"],
        amountValue: 1650,
        notes: "Customer requested quiet cleaning tools.",
        rating: 4.8,
        paymentMethod: "Cash",
        extras: ["Deep Cleaning Kit", "Ironing"],
    },
    {
        id: "ORD-9402",
        userName: "Nada Fathy",
        phone: "+20 100 333 7011",
        governorate: "Cairo",
        zone: "New Cairo",
        address: "Lake View Residence, New Cairo",
        arrivalDate: "2026-08-24",
        arrivalTime: "11:00 AM",
        offerName: "Gold Package",
        maids: ["Laila Mostafa"],
        amountValue: 2100,
        notes: "This order unlocks on 23-08-2026.",
        rating: 4.6,
        paymentMethod: "Wallet",
        extras: ["Kitchen Sanitizing", "Carpet Refresh"],
    },
    {
        id: "ORD-9403",
        userName: "Omar Hany",
        phone: "+20 128 870 0035",
        governorate: "Cairo",
        zone: "New Cairo",
        address: "90th Street, New Cairo",
        arrivalDate: "2026-08-12",
        arrivalTime: "09:00 AM",
        offerName: "Express Plus",
        maids: ["Hoda Ali"],
        amountValue: 920,
        notes: "Recurring weekly customer.",
        rating: 4.9,
        paymentMethod: "Bank Transfer",
        extras: ["Ironing"],
    },
    {
        id: "ORD-9404",
        userName: "Youssef Adel",
        phone: "+20 111 345 0011",
        governorate: "Cairo",
        zone: "New Cairo",
        address: "Mivida, New Cairo",
        arrivalDate: "2026-08-13",
        arrivalTime: "05:00 PM",
        offerName: "Move In Service",
        maids: ["Hoda Ali"],
        amountValue: 2400,
        notes: "Unlocks on 12-08-2026.",
        rating: 5,
        paymentMethod: "Cash",
        extras: ["Window Cleaning", "Fridge Cleaning"],
    },
    {
        id: "ORD-9412",
        userName: "Salma Emad",
        phone: "+20 106 612 0077",
        governorate: "Cairo",
        zone: "Nasr City",
        address: "88 Abbas El Akkad",
        arrivalDate: "2026-08-12",
        arrivalTime: "02:00 PM",
        offerName: "Kitchen Pro",
        maids: ["Amina Mostafa"],
        amountValue: 1200,
        notes: "Outside current partner zone.",
        rating: 4.5,
        paymentMethod: "Wallet",
        extras: ["Kitchen Sanitizing"],
    },
];

const offerCatalog = {
    "Premium Deep Clean": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Home Cleaning",
        packageName: "Premium Deep Clean",
        catalogPrice: 2400,
        duration: "3-4 hours",
        description:
            "Full home deep cleaning package covering rooms, bathrooms, kitchen surfaces, floors, and detailed finishing.",
    },
    "Express Plus": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Home Cleaning",
        packageName: "Express Plus",
        catalogPrice: 860,
        duration: "1.5-2 hours",
        description:
            "Fast cleaning visit for priority areas with focused finishing and light sanitizing.",
    },
    "Gold Package": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Move In Service",
        packageName: "Gold Package",
        catalogPrice: 2100,
        duration: "3 hours",
        description:
            "Move-in cleaning package for preparing a property before handover or first use.",
    },
    "Move In Service": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Move In Service",
        packageName: "Gold Package",
        catalogPrice: 2100,
        duration: "3 hours",
        description:
            "Move-in service based on the Super Admin service catalog, including detailed preparation before arrival.",
    },
    "Kitchen Pro": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Kitchen Cleaning",
        packageName: "Kitchen Pro",
        catalogPrice: 990,
        duration: "2 hours",
        description:
            "Kitchen-focused cleaning package including counters, sink, external appliance surfaces, and sanitizing.",
    },
};
const defaultMaids = [
    {
        id: "MD-1098",
        name: "Hoda Ali",
        status: "available",
        address: "New Cairo, Cairo",
        operatorId: "OP-1024",
        salary: 9200,
        doneOrders: 231,
        rating: 4.9,
        offDay: "Monday",
        documents: "Ready",
    },
    {
        id: "MD-1401",
        name: "Laila Mostafa",
        status: "busy",
        address: "New Cairo, Cairo",
        operatorId: "OP-1024",
        salary: 8800,
        doneOrders: 96,
        rating: 4.7,
        offDay: "Friday",
        documents: "Ready",
    },
    {
        id: "MD-1510",
        name: "Rana Fouad",
        status: "paused",
        address: "New Cairo, Cairo",
        operatorId: "OP-1024",
        salary: 7600,
        doneOrders: 44,
        rating: 4.3,
        offDay: "Sunday",
        documents: "Missing File",
    },
    {
        id: "MD-1042",
        name: "Amina Mostafa",
        status: "available",
        address: "Nasr City, Cairo",
        operatorId: "OP-1031",
        salary: 8500,
        doneOrders: 248,
        rating: 4.9,
        offDay: "Friday",
        documents: "Ready",
    },
];

const defaultMessages = [
    {
        audience: "super-admin",
        from: "Super Admin",
        at: "Today 09:10 AM",
        text: "All partner orders are listed. Customer name and address unlock 24 hours before arrival.",
        unread: true,
    },
    {
        audience: "supporter",
        from: "Supporter Hassan",
        at: "Yesterday 06:20 PM",
        text: "Assign maids normally; supporter controls status changes.",
        unread: true,
    },
    {
        audience: "super-admin",
        from: "Super Admin",
        at: "Yesterday 05:15 PM",
        text: "Locked order View opens a countdown until customer data unlocks.",
        unread: false,
    },
];

const q = (id) => document.getElementById(id);
const i18n = {
    en: {
        languageButton: "Arabic",
        partnerWorkspace: "Partner Workspace",
        partnerAccount: "Partner Account",
        navToday: "Today Schedule",
        navOrders: "Orders",
        navAvailability: "Availability",
        navMessages: "Messages",
        navSuperAdminMessages: "Super Admin Messages",
        navSupporterMessages: "Supporter Messages",
        navProfile: "My Profile",
        logout: "Logout",
        dailyOperations: "Daily Operations",
        currentSession: "Current Session",
        onlineNow: "Online Now",
        allOrders: "All Orders",
        needsAction: "Needs Action",
        availableMaids: "Available Maids",
        notifications: "Notifications",
        whatNeedsAttention: "What Needs Attention",
        clearRead: "Clear Read",
        ordersSchedule: "Orders Schedule",
        allAvailableDates: "All Available Dates",
        allOrdersOption: "All Orders",
        assignedOrdersOption: "Assigned Orders",
        orders: "Orders",
        ordersAssignedToZone: "Orders Assigned To My Zone",
        searchOrder: "Search order or customer",
        all: "All",
        today: "Today",
        tomorrow: "Tomorrow",
        availabilityBoard: "Availability Board",
        maidsManagedByMe: "Maids Managed By Me",
        searchMaid: "Search maid",
        messages: "Messages",
        superAdmin: "Super Admin",
        supporter: "Supporter",
        markAllRead: "Mark All Read",
        send: "Send",
        writeReply: "Write a reply",
        messageAudienceFilter: "Message audience filter",
        customerName: "Customer Name",
        orderNumber: "Order Number",
        address: "Address",
        arrivalTime: "Arrival Time",
        offerName: "Offer Name",
        arrivalDate: "Arrival Date",
        orderAmount: "Order Amount",
        maid: "Maid",
        actions: "Actions",
        status: "Status",
        area: "Area",
        rating: "Rating",
        salary: "Salary",
        doneOrders: "Done Orders",
        view: "View",
        assignMaid: "Assign Maid",
        issue: "Issue",
        reportIssue: "Report Issue",
        contact: "Contact",
        noMaidAssigned: "No maid assigned",
        unlocks24h: "Unlocks 24h before arrival",
        inProgress: "In Progress",
        dashboardScope:
            "All orders are listed. Customer name and address are blurred until 24 hours before arrival. Status is fixed as In Progress; supporter controls status changes.",
        todayLabel: "Today",
        noOrders: "No orders",
        noOrdersFilter: "No orders match this filter.",
        noOrdersTable: "No orders match the selected filters.",
        noUrgent: "No urgent notifications",
        zoneCalm: "Your current zone looks calm.",
        clear: "Clear",
        available: "Available",
        busy: "Busy",
        paused: "Paused",
        documentIssues: "Documents Issues",
        noMaids: "No maids are assigned to this partner yet.",
        off: "Off",
        details: "Details",
        orderDetails: "Order Details",
        customerPhone: "Customer Phone",
        paymentMethod: "Payment Method",
        notes: "Notes",
        notSet: "Not Set",
        offerDetails: "Offer Details",
        widget: "Widget",
        category: "Category",
        catalogCity: "Catalog City",
        catalogPrice: "Catalog Price",
        expectedDuration: "Expected Duration",
        selectedExtras: "Selected Extras",
        description: "Description",
        noExtras: "No Extras",
        lockedCustomerData: "Locked Customer Data",
        customerLocked: "Customer locked",
        addressUnlocks: "Address unlocks 24h before arrival",
        selectOneOrMore:
            "Select one or more maids. Hold Ctrl to choose more than one.",
        sendOrderData: "Send order data to selected maid(s)",
        saveAssignment: "Save Assignment",
        cancel: "Cancel",
        issueReporting: "Issue Reporting",
        issueType: "Issue Type",
        writeIssueDetails: "Write issue details",
        sendIssue: "Send Issue",
        noMessages: "No {audience} messages",
        conversationClear: "This conversation is clear for now.",
        replyTo: "Write a reply to {audience}",
        markedRead: "{audience} messages marked as read.",
        replySent: "Reply sent to {audience}.",
        readNotificationsCleared: "Read notifications cleared for this view.",
        selectAtLeastOne: "Select at least one maid for this order.",
        orderDataSent: " Order data sent to selected maid(s).",
        assignedTo: "{order} assigned to {maids}.",
        issueSent: "{order} issue sent to supporter.",
        contactOpened: "Contact request opened for {maid}.",
        maidDetails: "Maid Details",
        maidId: "Maid ID",
        documents: "Documents",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        lockedUnlockDate: "Customer name and address unlock on {date}.",
        orderCountLocked: "{count} order(s) have blurred customer data",
        countdownHint: "View shows a countdown until the data unlocks.",
        needsMaidAssignment: "{order} needs maid assignment",
        documentAttention: "{maid} document attention",
        compliance: "Compliance",
        action: "Action",
        locked: "Locked",
    },
    ar: {
        languageButton: "English",
        partnerWorkspace: "واجهة الشريك",
        partnerAccount: "حساب الشريك",
        navToday: "جدول اليوم",
        navOrders: "الطلبات",
        navAvailability: "الإتاحة",
        navMessages: "الرسائل",
        navSuperAdminMessages: "رسائل السوبر أدمن",
        navSupporterMessages: "رسائل الدعم",
        navProfile: "ملفي",
        logout: "تسجيل الخروج",
        dailyOperations: "العمليات اليومية",
        currentSession: "الجلسة الحالية",
        onlineNow: "متصل الآن",
        allOrders: "كل الطلبات",
        needsAction: "تحتاج إجراء",
        availableMaids: "العاملات المتاحات",
        notifications: "التنبيهات",
        whatNeedsAttention: "ما يحتاج متابعة",
        clearRead: "مسح المقروء",
        ordersSchedule: "جدول الطلبات",
        allAvailableDates: "كل التواريخ المتاحة",
        allOrdersOption: "كل الطلبات",
        assignedOrdersOption: "الطلبات المسندة",
        orders: "الطلبات",
        ordersAssignedToZone: "طلبات نطاق عملي",
        searchOrder: "ابحث برقم الطلب أو العميل",
        all: "الكل",
        today: "اليوم",
        tomorrow: "غدا",
        availabilityBoard: "لوحة الإتاحة",
        maidsManagedByMe: "العاملات تحت إدارتي",
        searchMaid: "ابحث عن عاملة",
        messages: "الرسائل",
        superAdmin: "السوبر أدمن",
        supporter: "الدعم",
        markAllRead: "تحديد الكل كمقروء",
        send: "إرسال",
        writeReply: "اكتب ردا",
        messageAudienceFilter: "فلتر جهة الرسائل",
        customerName: "اسم العميل",
        orderNumber: "رقم الطلب",
        address: "العنوان",
        arrivalTime: "موعد الوصول",
        offerName: "اسم العرض",
        arrivalDate: "تاريخ الوصول",
        orderAmount: "مبلغ الطلب",
        maid: "العاملة",
        actions: "الإجراءات",
        status: "الحالة",
        area: "المنطقة",
        rating: "التقييم",
        salary: "الراتب",
        doneOrders: "طلبات منفذة",
        view: "عرض",
        assignMaid: "إسناد عاملة",
        issue: "مشكلة",
        reportIssue: "إبلاغ عن مشكلة",
        contact: "تواصل",
        noMaidAssigned: "لم يتم إسناد عاملة",
        unlocks24h: "يفتح قبل الوصول بـ 24 ساعة",
        inProgress: "قيد التنفيذ",
        dashboardScope:
            "كل الطلبات ظاهرة. اسم العميل والعنوان يظهران بشكل غير واضح حتى قبل موعد الوصول بـ 24 ساعة. حالة الطلب ثابتة قيد التنفيذ وتغيير الحالة من خلال الدعم.",
        todayLabel: "اليوم",
        noOrders: "لا توجد طلبات",
        noOrdersFilter: "لا توجد طلبات مطابقة لهذا الفلتر.",
        noOrdersTable: "لا توجد طلبات مطابقة للفلاتر المختارة.",
        noUrgent: "لا توجد تنبيهات عاجلة",
        zoneCalm: "نطاق عملك هادئ حاليا.",
        clear: "واضح",
        available: "متاحة",
        busy: "مشغولة",
        paused: "موقوفة",
        documentIssues: "مشاكل مستندات",
        noMaids: "لا توجد عاملات مسندة لهذا الشريك حاليا.",
        off: "إجازة",
        details: "التفاصيل",
        orderDetails: "تفاصيل الطلب",
        customerPhone: "رقم العميل",
        paymentMethod: "طريقة الدفع",
        notes: "ملاحظات",
        notSet: "غير محدد",
        offerDetails: "تفاصيل العرض",
        widget: "الخدمة",
        category: "التصنيف",
        catalogCity: "محافظة الكتالوج",
        catalogPrice: "سعر الكتالوج",
        expectedDuration: "المدة المتوقعة",
        selectedExtras: "الإضافات المختارة",
        description: "الوصف",
        noExtras: "لا توجد إضافات",
        lockedCustomerData: "بيانات العميل مغلقة",
        customerLocked: "بيانات العميل مغلقة",
        addressUnlocks: "العنوان يفتح قبل الوصول بـ 24 ساعة",
        selectOneOrMore:
            "اختر عاملة أو أكثر. استخدم Ctrl لاختيار أكثر من واحدة.",
        sendOrderData: "إرسال بيانات الطلب للعاملات المختارة",
        saveAssignment: "حفظ الإسناد",
        cancel: "إلغاء",
        issueReporting: "إبلاغ عن مشكلة",
        issueType: "نوع المشكلة",
        writeIssueDetails: "اكتب تفاصيل المشكلة",
        sendIssue: "إرسال المشكلة",
        noMessages: "لا توجد رسائل من {audience}",
        conversationClear: "هذه المحادثة خالية حاليا.",
        replyTo: "اكتب ردا إلى {audience}",
        markedRead: "تم تحديد رسائل {audience} كمقروءة.",
        replySent: "تم إرسال الرد إلى {audience}.",
        readNotificationsCleared: "تم مسح التنبيهات المقروءة في هذا العرض.",
        selectAtLeastOne: "اختر عاملة واحدة على الأقل لهذا الطلب.",
        orderDataSent: " تم إرسال بيانات الطلب للعاملات المختارة.",
        assignedTo: "تم إسناد {order} إلى {maids}.",
        issueSent: "تم إرسال مشكلة {order} إلى الدعم.",
        contactOpened: "تم فتح طلب تواصل مع {maid}.",
        maidDetails: "تفاصيل العاملة",
        maidId: "كود العاملة",
        documents: "المستندات",
        days: "أيام",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثواني",
        lockedUnlockDate: "اسم العميل والعنوان يفتحان في {date}.",
        orderCountLocked: "{count} طلب به بيانات عميل غير واضحة",
        countdownHint: "زر العرض يوضح عدادا حتى فتح البيانات.",
        needsMaidAssignment: "الطلب {order} يحتاج إسناد عاملة",
        documentAttention: "مستندات {maid} تحتاج مراجعة",
        compliance: "امتثال",
        action: "إجراء",
        locked: "مغلق",
    },
};
Object.assign(i18n.en, {
    navDoneOrders: "Done Orders",
    unreadAlerts: "Unread Alerts",
    lockedOrders: "Locked Orders",
    maidIssues: "Maid Issues",
    handoverChecklist: "Order Handover Checklist",
    checkMaidConfirmed: "Maid assignment confirmed",
    checkArrivalConfirmed: "Arrival date and time reviewed",
    checkPaymentReviewed: "Payment method reviewed",
    checkDataReady: "Allowed order data ready to send",
    availableMaidsLabel: "Available Maids",
    selectMaidsHelp:
        "Select one or more maids. Hold Ctrl to choose more than one.",
    sendOrderDataCheck: "Send order data to selected maid(s)",
    checklistRequired:
        "Complete the handover checklist before saving assignment.",
});
Object.assign(i18n.ar, {
    navDoneOrders:
        "\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0646\u0641\u0630\u0629",
    unreadAlerts:
        "\u062a\u0646\u0628\u064a\u0647\u0627\u062a \u063a\u064a\u0631 \u0645\u0642\u0631\u0648\u0621\u0629",
    lockedOrders:
        "\u0637\u0644\u0628\u0627\u062a \u0645\u063a\u0644\u0642\u0629",
    maidIssues:
        "\u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u0639\u0627\u0645\u0644\u0627\u062a",
    handoverChecklist:
        "\u0642\u0627\u0626\u0645\u0629 \u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0637\u0644\u0628",
    checkMaidConfirmed:
        "\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0625\u0633\u0646\u0627\u062f \u0627\u0644\u0639\u0627\u0645\u0644\u0629",
    checkArrivalConfirmed:
        "\u062a\u0645\u062a \u0645\u0631\u0627\u062c\u0639\u0629 \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0648\u0645\u0648\u0639\u062f \u0627\u0644\u0648\u0635\u0648\u0644",
    checkPaymentReviewed:
        "\u062a\u0645\u062a \u0645\u0631\u0627\u062c\u0639\u0629 \u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639",
    checkDataReady:
        "\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0633\u0645\u0648\u062d\u0629 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0625\u0631\u0633\u0627\u0644",
    availableMaidsLabel:
        "\u0627\u0644\u0639\u0627\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0627\u062a",
    selectMaidsHelp:
        "\u0627\u062e\u062a\u0631 \u0639\u0627\u0645\u0644\u0629 \u0623\u0648 \u0623\u0643\u062b\u0631. \u0627\u0633\u062a\u062e\u062f\u0645 Ctrl \u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0623\u0643\u062b\u0631 \u0645\u0646 \u0648\u0627\u062d\u062f\u0629.",
    sendOrderDataCheck:
        "\u0625\u0631\u0633\u0627\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0639\u0627\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629",
    checklistRequired:
        "\u0623\u0643\u0645\u0644 \u0642\u0627\u0626\u0645\u0629 \u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0637\u0644\u0628 \u0642\u0628\u0644 \u062d\u0641\u0638 \u0627\u0644\u0625\u0633\u0646\u0627\u062f.",
});
let activeLanguage = localStorage.getItem("partnerWorkspaceLanguage") || "en";
function t(key, params = {}) {
    let value = i18n[activeLanguage]?.[key] || i18n.en[key] || key;
    Object.entries(params).forEach(([name, replacement]) => {
        value = value.replaceAll(`{${name}}`, replacement);
    });
    return value;
}
function applyLanguage() {
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = activeLanguage === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", activeLanguage === "ar");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
        node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
    });
    q("languageToggleBtn").textContent = t("languageButton");
    q("partnerRoleLabel").textContent =
        `${t("partnerAccount")} / ${activePartner?.id || ""}`.trim();
    renderTableHeaders();
    setMessageAudience(activeMessageAudience);
    translateRenderedText();
}
function setLanguage(language) {
    activeLanguage = language === "ar" ? "ar" : "en";
    localStorage.setItem("partnerWorkspaceLanguage", activeLanguage);
    renderHeader();
    renderAll();
    applyLanguage();
}
function renderTableHeaders() {
    const orderHeaders = [
        "customerName",
        "orderNumber",
        "address",
        "arrivalTime",
        "offerName",
        "arrivalDate",
        "orderAmount",
        "maid",
        "actions",
    ];
    document.querySelectorAll("#ordersSection th").forEach((cell, index) => {
        cell.textContent = t(orderHeaders[index]);
    });
    const maidHeaders = [
        "maid",
        "status",
        "area",
        "rating",
        "salary",
        "doneOrders",
        "actions",
    ];
    document.querySelectorAll("#maidsSection th").forEach((cell, index) => {
        cell.textContent = t(maidHeaders[index]);
    });
}
function translateRenderedText() {
    if (activeLanguage !== "ar") return;
    const replacements = new Map([
        ["View", t("view")],
        ["Assign Maid", t("assignMaid")],
        ["Report Issue", t("reportIssue")],
        ["Issue", t("issue")],
        ["Contact", t("contact")],
        ["Available", t("available")],
        ["Busy", t("busy")],
        ["Paused", t("paused")],
        ["Documents Issues", t("documentIssues")],
        ["No maid assigned", t("noMaidAssigned")],
        ["Unlocks 24h before arrival", t("unlocks24h")],
        ["In Progress", t("inProgress")],
        ["No orders", t("noOrders")],
        ["No orders match this filter.", t("noOrdersFilter")],
        ["No orders match the selected filters.", t("noOrdersTable")],
        ["No urgent notifications", t("noUrgent")],
        ["Your current zone looks calm.", t("zoneCalm")],
        ["Clear", t("clear")],
    ]);
    document
        .querySelectorAll("button, span, small, strong, p, td")
        .forEach((node) => {
            const text = node.textContent.trim();
            if (replacements.has(text) && node.children.length === 0)
                node.textContent = replacements.get(text);
        });
    q("messageAudienceTitle").textContent =
        activeMessageAudience === "supporter"
            ? t("navSupporterMessages")
            : t("navSuperAdminMessages");
}
let toastTimer;
let activeIssueOrderId = null;
let activeAssignOrderId = null;
let activeMessageAudience =
    new URLSearchParams(location.search).get("message") === "supporter"
        ? "supporter"
        : "super-admin";

function readJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
}
function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function escapeHtml(value) {
    return String(value).replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[character],
    );
}
function money(value) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}
function formatDisplayDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
}
function parseDateOnly(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}
function addDays(date, amount) {
    const next = new Date(date);
    next.setDate(next.getDate() + amount);
    next.setHours(0, 0, 0, 0);
    return next;
}
function getToday() {
    const override = localStorage.getItem("partnerDashboardToday");
    const today = override ? parseDateOnly(override) : new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}
function revealDate(order) {
    return addDays(parseDateOnly(order.arrivalDate), -1);
}
function isOrderUnlocked(order) {
    return getToday() >= revealDate(order);
}
function orderStatus() {
    return "In Progress";
}
function sameDate(left, right) {
    return (
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
}
function matchesDateFilter(order, filter) {
    if (filter === "all") return true;
    const arrival = parseDateOnly(order.arrivalDate);
    const today = getToday();
    const tomorrow = addDays(today, 1);
    return filter === "today"
        ? sameDate(arrival, today)
        : sameDate(arrival, tomorrow);
}
function showToast(message) {
    q("partnerWorkspaceToast").textContent = message;
    q("partnerWorkspaceToast").classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => q("partnerWorkspaceToast").classList.add("hidden"),
        2600,
    );
}
function countdownParts(order) {
    const ms = Math.max(0, revealDate(order).getTime() - getToday().getTime());
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return { days, hours, minutes, seconds };
}

function resolvePartner() {
    const session = readJson("tarwiqaPartnerSession", null);
    if (session?.partnerId) {
        const partner =
            partners.find((item) => item.id === session.partnerId) ||
            partners[0];
        return {
            ...partner,
            ...session,
            id: session.partnerId,
            zone: session.workZone || partner.zone,
        };
    }
    return partners[0];
}

const activePartner = resolvePartner();
const issueKey = `partnerIssues:${activePartner.id}`;
const assignmentKey = `partnerOrderAssignments:${activePartner.id}`;
const savedAssignments = readJson(assignmentKey, {});
const scopedOrders = partnerOrders
    .filter(
        (order) =>
            order.governorate === activePartner.governorate &&
            order.zone === activePartner.zone,
    )
    .map((order) => ({
        ...order,
        status: orderStatus(),
        maids: savedAssignments[order.id] || order.maids,
    }));
const scopedMaids = [...defaultMaids, ...readJson("createdMaids", [])]
    .filter(
        (maid, index, all) =>
            all.findIndex((item) => item.id === maid.id) === index,
    )
    .filter((maid) => maid.operatorId === activePartner.id);

function saveAssignments() {
    writeJson(
        assignmentKey,
        Object.fromEntries(
            scopedOrders.map((order) => [order.id, order.maids]),
        ),
    );
}
function maskedValue(value, unlocked) {
    return unlocked
        ? escapeHtml(value)
        : `<span class="locked-data">${escapeHtml(value)}</span>`;
}
function lockedHint(unlocked) {
    return unlocked ? "" : "<small>Unlocks 24h before arrival</small>";
}

function renderHeader() {
    q("partnerName").textContent = activePartner.name;
    q("partnerRoleLabel").textContent =
        `${activePartner.id} / ${activePartner.zone}`;
    q("partnerScope").textContent =
        `All orders are listed. Customer name and address are blurred until 24 hours before arrival. Status is fixed as In Progress; supporter controls status changes.`;
    q("sessionStarted").textContent =
        `Today ${formatDisplayDate(getToday().toISOString().slice(0, 10))}`;
    q("profileLink").href =
        `./partner-profile.html?partnerId=${encodeURIComponent(activePartner.id)}`;
}
function renderMetrics() {
    const availableMaids = scopedMaids.filter(
        (maid) => maid.status === "available",
    ).length;
    q("todayOrdersMetric").textContent = scopedOrders.length;
    q("needsActionMetric").textContent = scopedOrders.filter(
        (order) => !order.maids.length,
    ).length;
    q("availableMaidsMetric").textContent = availableMaids;
}
function renderNotifications() {
    const issues = readJson(issueKey, []);
    const lockedCount = scopedOrders.filter(
        (order) => !isOrderUnlocked(order),
    ).length;
    const maidIssueCount = scopedMaids.filter(
        (maid) => maid.documents !== "Ready",
    ).length;
    const notifications = [
        ...(lockedCount
            ? [
                  {
                      title: `${lockedCount} order(s) have blurred customer data`,
                      text: "View shows a countdown until the data unlocks.",
                      priority: "Locked",
                  },
              ]
            : []),
        ...scopedOrders
            .filter((order) => !order.maids.length)
            .map((order) => ({
                title: `${order.id} needs maid assignment`,
                text: `${formatDisplayDate(order.arrivalDate)} / ${order.arrivalTime} / ${order.offerName}`,
                priority: "Action",
            })),
        ...scopedMaids
            .filter((maid) => maid.documents !== "Ready")
            .map((maid) => ({
                title: `${maid.name} document attention`,
                text: `${maid.documents} / ${maid.status}`,
                priority: "Compliance",
            })),
        ...issues.slice(0, 2).map((issue) => ({
            title: `${issue.orderId} issue sent to supporter`,
            text: `${issue.type} / ${issue.details}`,
            priority: "Issue",
        })),
    ];
    if (q("unreadAlertsMetric"))
        q("unreadAlertsMetric").textContent = String(notifications.length);
    if (q("lockedOrdersMetric"))
        q("lockedOrdersMetric").textContent = String(lockedCount);
    if (q("maidIssuesMetric"))
        q("maidIssuesMetric").textContent = String(maidIssueCount);
    q("notificationList").innerHTML = notifications.length
        ? notifications
              .map(
                  (item) =>
                      `<article class="notification-item"><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div><span class="priority">${escapeHtml(item.priority)}</span></article>`,
              )
              .join("")
        : '<article class="notification-item"><div><strong>No urgent notifications</strong><p>Your current zone looks calm.</p></div><span class="priority">Clear</span></article>';
}
function filteredOrders() {
    const query = q("orderSearch").value.trim().toLowerCase();
    const dateFilter = q("orderDateFilter").value;
    return scopedOrders.filter(
        (order) =>
            `${order.id} ${order.userName} ${order.address} ${order.offerName} ${order.maids.join(" ")}`
                .toLowerCase()
                .includes(query) && matchesDateFilter(order, dateFilter),
    );
}
function renderSchedule() {
    const filter = q("scheduleFilter").value;
    let rows = [...scopedOrders].sort((a, b) =>
        `${a.arrivalDate} ${a.arrivalTime}`.localeCompare(
            `${b.arrivalDate} ${b.arrivalTime}`,
        ),
    );
    if (filter === "assigned")
        rows = rows.filter((order) => order.maids.length > 0);
    q("scheduleList").innerHTML = rows.length
        ? rows
              .map((order) => {
                  const unlocked = isOrderUnlocked(order);
                  return `<article class="schedule-item"><div class="schedule-time">${escapeHtml(order.arrivalTime)}</div><div><strong>${escapeHtml(order.id)} / ${maskedValue(order.userName, unlocked)}</strong><p class="${unlocked ? "" : "locked-cell"}">${maskedValue(order.address, unlocked)}${lockedHint(unlocked)}</p><div class="schedule-meta"><span>${escapeHtml(order.status)}</span><button class="offer-link" type="button" data-offer-order="${order.id}">${escapeHtml(order.offerName)}</button><span>${formatDisplayDate(order.arrivalDate)}</span><span>${escapeHtml(order.maids.join(", ") || "No maid assigned")}</span></div></div><div class="schedule-actions"><button class="row-btn" data-view-order="${order.id}" type="button">View</button><button class="row-btn assign" data-assign-order="${order.id}" type="button">Assign Maid</button><button class="row-btn danger" data-report-order="${order.id}" type="button">Report Issue</button></div></article>`;
              })
              .join("")
        : '<article class="schedule-item"><div class="schedule-time">--</div><div><strong>No orders</strong><p>No orders match this filter.</p></div></article>';
}
function renderOrders() {
    const rows = filteredOrders();
    q("ordersTableBody").innerHTML = rows.length
        ? rows
              .map((order) => {
                  const unlocked = isOrderUnlocked(order);
                  return `<tr><td class="${unlocked ? "" : "locked-cell"}">${maskedValue(order.userName, unlocked)}${lockedHint(unlocked)}</td><td><strong>${escapeHtml(order.id)}</strong></td><td class="${unlocked ? "" : "locked-cell"}">${maskedValue(order.address, unlocked)}${lockedHint(unlocked)}</td><td>${escapeHtml(order.arrivalTime)}</td><td><button class="offer-link" type="button" data-offer-order="${order.id}">${escapeHtml(order.offerName)}</button></td><td>${formatDisplayDate(order.arrivalDate)}</td><td><strong>${money(order.amountValue)}</strong></td><td>${escapeHtml(order.maids.join(", ") || "No maid assigned")}</td><td><div class="row-actions"><button class="row-btn" type="button" data-view-order="${order.id}">View</button><button class="row-btn assign" type="button" data-assign-order="${order.id}">Assign Maid</button><button class="row-btn danger" type="button" data-report-order="${order.id}">Issue</button></div></td></tr>`;
              })
              .join("")
        : '<tr><td colspan="9">No orders match the selected filters.</td></tr>';
}
function renderAvailability() {
    const counts = { available: 0, busy: 0, paused: 0, expired: 0 };
    scopedMaids.forEach((maid) => {
        counts[maid.status] = (counts[maid.status] || 0) + 1;
    });
    q("availabilityGrid").innerHTML = [
        ["Available", counts.available],
        ["Busy", counts.busy],
        ["Paused", counts.paused],
        [
            "Documents Issues",
            scopedMaids.filter((maid) => maid.documents !== "Ready").length,
        ],
    ]
        .map(
            ([label, value]) =>
                `<article class="availability-stat"><span>${label}</span><strong>${value}</strong></article>`,
        )
        .join("");
}
function filteredMaids() {
    const query = q("maidSearch").value.trim().toLowerCase();
    return scopedMaids.filter((maid) =>
        `${maid.id} ${maid.name} ${maid.status} ${maid.address}`
            .toLowerCase()
            .includes(query),
    );
}
function renderMaids() {
    const rows = filteredMaids();
    q("maidsTableBody").innerHTML = rows.length
        ? rows
              .map(
                  (maid) =>
                      `<tr><td><div class="name-cell"><strong>${escapeHtml(maid.name)}</strong><small>${escapeHtml(maid.id)} / Off ${escapeHtml(maid.offDay)}</small></div></td><td><span class="status-pill ${escapeHtml(maid.status)}">${escapeHtml(maid.status)}</span></td><td>${escapeHtml(maid.address)}<br><small>${escapeHtml(maid.documents)}</small></td><td>${maid.rating}</td><td><strong>${money(maid.salary)}</strong></td><td>${maid.doneOrders}</td><td><div class="row-actions"><button class="row-btn" type="button" data-view-maid="${maid.id}">View</button><button class="row-btn secondary" type="button" data-call-maid="${maid.id}">Contact</button></div></td></tr>`,
              )
              .join("")
        : '<tr><td colspan="7">No maids are assigned to this partner yet.</td></tr>';
}
function currentAudienceLabel() {
    return activeMessageAudience === "supporter" ? "Supporter" : "Super Admin";
}
function messageKey() {
    return `partnerMessages:${activePartner.id}`;
}
function normalizeMessages(messages) {
    return messages.map((item) => ({
        audience:
            item.audience ||
            (item.from?.toLowerCase().includes("support")
                ? "supporter"
                : "super-admin"),
        ...item,
    }));
}
function setMessageAudience(audience) {
    activeMessageAudience =
        audience === "supporter" ? "supporter" : "super-admin";
    document
        .querySelectorAll("[data-message-target]")
        .forEach((button) =>
            button.classList.toggle(
                "active",
                button.dataset.messageTarget === activeMessageAudience,
            ),
        );
    q("messageAudienceTitle").textContent =
        `${currentAudienceLabel()} Messages`;
    q("replyInput").placeholder = `Write a reply to ${currentAudienceLabel()}`;
    renderMessages();
}
function renderMessages() {
    const messages = normalizeMessages(readJson(messageKey(), defaultMessages));
    const visibleMessages = messages.filter(
        (item) => item.audience === activeMessageAudience,
    );
    q("messageThread").innerHTML = visibleMessages.length
        ? visibleMessages
              .map(
                  (item) =>
                      `<article class="message-item ${item.unread ? "unread" : ""}"><strong>${escapeHtml(item.from)} / ${escapeHtml(item.at)}</strong><p>${escapeHtml(item.text)}</p></article>`,
              )
              .join("")
        : `<article class="message-item"><strong>No ${escapeHtml(currentAudienceLabel())} messages</strong><p>This conversation is clear for now.</p></article>`;
}

const detailLabelTranslations = {
    "Order Number": "orderNumber",
    "Offer Name": "offerName",
    Widget: "widget",
    Category: "category",
    "Catalog City": "catalogCity",
    "Catalog Price": "catalogPrice",
    "Order Amount": "orderAmount",
    "Expected Duration": "expectedDuration",
    "Selected Extras": "selectedExtras",
    Description: "description",
    "Customer Name": "customerName",
    "Customer Phone": "customerPhone",
    Address: "address",
    "Arrival Time": "arrivalTime",
    "Arrival Date": "arrivalDate",
    "Payment Method": "paymentMethod",
    Maid: "maid",
    Status: "status",
    Notes: "notes",
    "Maid ID": "maidId",
    Area: "area",
    Rating: "rating",
    Salary: "salary",
    "Done Orders": "doneOrders",
    "Off Day": "off",
    Documents: "documents",
};
function localizedDetailLabel(label) {
    return activeLanguage === "ar"
        ? t(detailLabelTranslations[label] || label)
        : label;
}
function localizedDetailValue(value) {
    if (activeLanguage !== "ar") return value;
    if (value === "No Extras") return t("noExtras");
    if (value === "No maid assigned") return t("noMaidAssigned");
    if (value === "In Progress") return t("inProgress");
    if (value === "Not Set") return t("notSet");
    return value;
}
function openDetails(title, eyebrow, fields) {
    q("detailsTitle").textContent = title;
    q("detailsEyebrow").textContent = eyebrow;
    q("detailsContent").innerHTML = fields
        .map(
            (field) =>
                `<article class="detail-field"><span>${escapeHtml(localizedDetailLabel(field.label))}</span><strong>${escapeHtml(localizedDetailValue(field.value))}</strong></article>`,
        )
        .join("");
    q("detailsModal").classList.remove("hidden");
    q("detailsModal").setAttribute("aria-hidden", "false");
}
function closeDetails() {
    q("detailsModal").classList.add("hidden");
    q("detailsModal").setAttribute("aria-hidden", "true");
}
function getOrderById(orderId) {
    return scopedOrders.find((order) => order.id === orderId);
}
function openCountdown(order) {
    const parts = countdownParts(order);
    openDetails(order.id, "Locked Customer Data", [
        { label: "Order Number", value: order.id },
        { label: "Offer Name", value: order.offerName },
        { label: "Arrival Date", value: formatDisplayDate(order.arrivalDate) },
        { label: "Arrival Time", value: order.arrivalTime },
    ]);
    q("detailsContent").insertAdjacentHTML(
        "beforeend",
        `<section class="countdown-card"><p class="locked-note">Customer name and address unlock on ${formatDisplayDate(revealDate(order).toISOString().slice(0, 10))}.</p><div class="countdown-box"><article><strong>${parts.days}</strong><span>Days</span></article><article><strong>${parts.hours}</strong><span>Hours</span></article><article><strong>${parts.minutes}</strong><span>Minutes</span></article><article><strong>${parts.seconds}</strong><span>Seconds</span></article></div></section>`,
    );
}
function openOfferDetails(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;
    const details = offerCatalog[order.offerName] || {
        city: order.governorate,
        widget: "Service",
        category: "Custom Offer",
        packageName: order.offerName,
        catalogPrice: order.amountValue,
        duration: "According to order",
        description: "Custom offer details from the order data.",
    };
    openDetails(details.packageName || order.offerName, "Offer Details", [
        { label: "Order Number", value: order.id },
        { label: "Offer Name", value: order.offerName },
        { label: "Widget", value: details.widget },
        { label: "Category", value: details.category },
        { label: "Catalog City", value: details.city },
        { label: "Catalog Price", value: money(details.catalogPrice) },
        { label: "Order Amount", value: money(order.amountValue) },
        { label: "Expected Duration", value: details.duration },
        {
            label: "Selected Extras",
            value: order.extras?.length ? order.extras.join(", ") : "No Extras",
        },
        { label: "Description", value: details.description },
    ]);
}
function openIssue(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;
    activeIssueOrderId = orderId;
    q("issueOrderId").value = orderId;
    q("issueTitle").textContent = `Report Issue / ${orderId}`;
    q("issueDetails").value = "";
    q("issueModal").classList.remove("hidden");
    q("issueModal").setAttribute("aria-hidden", "false");
}
function closeIssue() {
    q("issueModal").classList.add("hidden");
    q("issueModal").setAttribute("aria-hidden", "true");
    activeIssueOrderId = null;
}
function availableMaidsForAssignment(order) {
    const currentNames = new Set(order.maids || []);
    const readyMaids = scopedMaids.filter(
        (maid) =>
            maid.documents === "Ready" &&
            ["available", "busy"].includes(maid.status),
    );
    return readyMaids.length
        ? readyMaids
        : scopedMaids.filter((maid) => currentNames.has(maid.name));
}
function openAssign(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;
    const unlocked = isOrderUnlocked(order);
    activeAssignOrderId = orderId;
    q("assignOrderId").value = orderId;
    q("assignTitle").textContent = `Assign Maid / ${orderId}`;
    q("assignOrderSummary").innerHTML =
        `<strong>${unlocked ? escapeHtml(order.userName) : "Customer locked"} / ${formatDisplayDate(order.arrivalDate)} ${escapeHtml(order.arrivalTime)}</strong><span>${unlocked ? escapeHtml(order.address) : "Address unlocks 24h before arrival"}</span><span>Offer: ${escapeHtml(order.offerName)} / Amount: ${money(order.amountValue)}</span>`;
    const currentNames = new Set(order.maids || []);
    q("assignMaidSelect").innerHTML = availableMaidsForAssignment(order)
        .map(
            (maid) =>
                `<option value="${escapeHtml(maid.name)}" ${currentNames.has(maid.name) ? "selected" : ""}>${escapeHtml(maid.name)} - ${escapeHtml(maid.status)} - Rating ${maid.rating}</option>`,
        )
        .join("");
    q("sendOrderDataCheck").checked = true;
    [
        "checkMaidConfirmed",
        "checkArrivalConfirmed",
        "checkPaymentReviewed",
        "checkDataReady",
    ].forEach((id) => {
        if (q(id)) q(id).checked = false;
    });
    q("assignModal").classList.remove("hidden");
    q("assignModal").setAttribute("aria-hidden", "false");
}
function closeAssign() {
    q("assignModal").classList.add("hidden");
    q("assignModal").setAttribute("aria-hidden", "true");
    activeAssignOrderId = null;
}
function saveAssignment() {
    const order = getOrderById(activeAssignOrderId);
    if (!order) return;
    const checklistReady = [
        "checkMaidConfirmed",
        "checkArrivalConfirmed",
        "checkPaymentReviewed",
        "checkDataReady",
    ].every((id) => q(id)?.checked);
    if (!checklistReady) {
        showToast(t("checklistRequired"));
        return;
    }
    const selectedMaids = Array.from(q("assignMaidSelect").selectedOptions).map(
        (option) => option.value,
    );
    if (!selectedMaids.length) {
        showToast("Select at least one maid for this order.");
        return;
    }
    order.maids = selectedMaids;
    saveAssignments();
    closeAssign();
    renderAll();
    const sendText = q("sendOrderDataCheck").checked
        ? " Order data sent to selected maid(s)."
        : "";
    showToast(
        `${order.id} assigned to ${selectedMaids.join(", ")}.${sendText}`,
    );
}
function viewOrder(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;
    if (!isOrderUnlocked(order)) {
        openCountdown(order);
        return;
    }
    openDetails(order.id, "Order Details", [
        { label: "Customer Name", value: order.userName },
        { label: "Customer Phone", value: order.phone },
        { label: "Order Number", value: order.id },
        { label: "Address", value: order.address },
        { label: "Arrival Time", value: order.arrivalTime },
        { label: "Offer Name", value: order.offerName },
        { label: "Arrival Date", value: formatDisplayDate(order.arrivalDate) },
        { label: "Order Amount", value: money(order.amountValue) },
        { label: "Payment Method", value: order.paymentMethod || "Not Set" },
        { label: "Maid", value: order.maids.join(", ") || "No maid assigned" },
        { label: "Status", value: order.status },
        { label: "Notes", value: order.notes },
    ]);
}
function viewMaid(maidId) {
    const maid = scopedMaids.find((item) => item.id === maidId);
    if (!maid) return;
    openDetails(maid.name, "Maid Details", [
        { label: "Maid ID", value: maid.id },
        { label: "Status", value: maid.status },
        { label: "Area", value: maid.address },
        { label: "Rating", value: maid.rating },
        { label: "Salary", value: money(maid.salary) },
        { label: "Done Orders", value: maid.doneOrders },
        { label: "Off Day", value: maid.offDay },
        { label: "Documents", value: maid.documents },
    ]);
}
function renderAll() {
    renderMetrics();
    renderNotifications();
    renderSchedule();
    renderOrders();
    renderAvailability();
    renderMaids();
    renderMessages();
}

function wrapLocalizedRender(renderFn) {
    return function localizedRenderWrapper(...args) {
        const result = renderFn.apply(this, args);
        if (activeLanguage === "ar") {
            renderTableHeaders();
            translateRenderedText();
        }
        return result;
    };
}
renderNotifications = wrapLocalizedRender(renderNotifications);
renderSchedule = wrapLocalizedRender(renderSchedule);
renderOrders = wrapLocalizedRender(renderOrders);
renderAvailability = wrapLocalizedRender(renderAvailability);
renderMaids = wrapLocalizedRender(renderMaids);
renderMessages = wrapLocalizedRender(renderMessages);
function bindActions() {
    q("scheduleFilter").addEventListener("change", renderSchedule);
    q("orderSearch").addEventListener("input", renderOrders);
    q("orderDateFilter").addEventListener("change", renderOrders);
    q("maidSearch").addEventListener("input", renderMaids);
    document.querySelectorAll("[data-message-target]").forEach((button) =>
        button.addEventListener("click", () => {
            setMessageAudience(button.dataset.messageTarget);
            q("messagesSection").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }),
    );
    document.addEventListener("click", (event) => {
        const offerBtn = event.target.closest("[data-offer-order]");
        const viewOrderBtn = event.target.closest("[data-view-order]");
        const reportBtn = event.target.closest("[data-report-order]");
        const assignBtn = event.target.closest("[data-assign-order]");
        const viewMaidBtn = event.target.closest("[data-view-maid]");
        const callMaidBtn = event.target.closest("[data-call-maid]");
        if (offerBtn) openOfferDetails(offerBtn.dataset.offerOrder);
        if (viewOrderBtn) viewOrder(viewOrderBtn.dataset.viewOrder);
        if (assignBtn) openAssign(assignBtn.dataset.assignOrder);
        if (reportBtn) openIssue(reportBtn.dataset.reportOrder);
        if (viewMaidBtn) viewMaid(viewMaidBtn.dataset.viewMaid);
        if (callMaidBtn) {
            const maid = scopedMaids.find(
                (item) => item.id === callMaidBtn.dataset.callMaid,
            );
            showToast(`Contact request opened for ${maid?.name || "maid"}.`);
        }
    });
    q("issueForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const order = getOrderById(activeIssueOrderId);
        if (!order) return;
        const issue = {
            orderId: order.id,
            type: q("issueType").value,
            details: q("issueDetails").value.trim(),
            at: new Date().toISOString(),
        };
        writeJson(issueKey, [issue, ...readJson(issueKey, [])]);
        closeIssue();
        renderAll();
        showToast(`${order.id} issue sent to supporter.`);
    });
    q("clearNotificationsBtn").addEventListener("click", () =>
        showToast("Read notifications cleared for this view."),
    );
    q("clearMessageBtn").addEventListener("click", () => {
        const messages = normalizeMessages(
            readJson(messageKey(), defaultMessages),
        ).map((item) =>
            item.audience === activeMessageAudience
                ? { ...item, unread: false }
                : item,
        );
        writeJson(messageKey(), messages);
        renderMessages();
        showToast(`${currentAudienceLabel()} messages marked as read.`);
    });
    q("replyForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const text = q("replyInput").value.trim();
        if (!text) return;
        const messages = normalizeMessages(
            readJson(messageKey(), defaultMessages),
        );
        writeJson(messageKey(), [
            {
                audience: activeMessageAudience,
                from: activePartner.name,
                at: new Date().toLocaleString("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }),
                text,
                unread: false,
            },
            ...messages,
        ]);
        q("replyInput").value = "";
        renderMessages();
        showToast(`Reply sent to ${currentAudienceLabel()}.`);
    });
    q("closeDetailsModal").addEventListener("click", closeDetails);
    q("detailsModal").addEventListener("click", (event) => {
        if (event.target === q("detailsModal")) closeDetails();
    });
    q("assignForm").addEventListener("submit", (event) => {
        event.preventDefault();
        saveAssignment();
    });
    q("closeAssignModal").addEventListener("click", closeAssign);
    q("cancelAssignBtn").addEventListener("click", closeAssign);
    q("assignModal").addEventListener("click", (event) => {
        if (event.target === q("assignModal")) closeAssign();
    });
    q("closeIssueModal").addEventListener("click", closeIssue);
    q("cancelIssueBtn").addEventListener("click", closeIssue);
    q("issueModal").addEventListener("click", (event) => {
        if (event.target === q("issueModal")) closeIssue();
    });
    q("languageToggleBtn").addEventListener("click", () =>
        setLanguage(activeLanguage === "en" ? "ar" : "en"),
    );
    q("logoutPartnerBtn").addEventListener("click", () => {
        localStorage.removeItem("tarwiqaPartnerSession");
        window.location.href = "./partner-login.html";
    });
}
renderHeader();
renderAll();
bindActions();
applyLanguage();
