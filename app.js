const STORAGE_KEY = "finance-tracker-mvp-2.state";
const LEGACY_OPERATIONS_KEY = "finance-tracker-mvp-2.operations";

const demoState = {
  accountGroups: [],
  accounts: [
    { id: "account-main", title: "Основной", icon: "💳", color: "#57be7a", initialBalance: 0, order: 1 },
    { id: "account-cash", title: "Наличные", icon: "💵", color: "#f1c65b", initialBalance: 0, order: 2 },
    { id: "account-savings", title: "Накопления", icon: "🏦", color: "#28bfc0", initialBalance: 0, order: 3 },
  ],
  categories: [
    { id: "cat-salary", type: "income", title: "Зарплата", icon: "💼", color: "#57be7a", order: 1 },
    { id: "cat-project", type: "income", title: "Проект", icon: "🐝", color: "#8f6ee8", order: 2 },
    { id: "cat-rent", type: "expense", title: "Аренда", icon: "🏠", color: "#565963", order: 1 },
    { id: "cat-food", type: "expense", title: "Продукты питания", icon: "🧺", color: "#ff9300", order: 2 },
    { id: "cat-education", type: "expense", title: "Образование", icon: "📚", color: "#2f8f83", order: 3 },
  ],
  tags: [
    { id: "tag-family", title: "семья", color: "#f1c65b", order: 1 },
    { id: "tag-work", title: "работа", color: "#57be7a", order: 2 },
  ],
  operations: [
    {
      id: "demo-1",
      date: "2026-04-03",
      type: "income",
      status: "fact",
      accountId: "account-main",
      categoryId: "cat-salary",
      title: "Работа",
      amount: 54000,
      tags: ["tag-work"],
    },
    {
      id: "demo-2",
      date: "2026-04-08",
      type: "expense",
      status: "fact",
      accountId: "account-main",
      categoryId: "cat-rent",
      title: "Квартира",
      amount: 15497,
      tags: [],
    },
    {
      id: "demo-3",
      date: "2026-04-14",
      type: "expense",
      status: "fact",
      accountId: "account-main",
      categoryId: "cat-food",
      title: "Продукты",
      amount: 3270,
      tags: ["tag-family"],
    },
    {
      id: "demo-4",
      date: "2026-04-16",
      type: "transfer",
      status: "fact",
      fromAccountId: "account-main",
      toAccountId: "account-savings",
      title: "Отложил в накопления",
      amount: 5000,
      tags: [],
    },
    {
      id: "demo-5",
      date: "2026-04-20",
      type: "income",
      status: "plan",
      accountId: "account-main",
      categoryId: "cat-project",
      title: "Оплата клиента",
      amount: 20000,
      tags: ["tag-work"],
    },
    {
      id: "demo-6",
      date: "2026-04-24",
      type: "expense",
      status: "plan",
      accountId: "account-main",
      categoryId: "cat-education",
      title: "Курс",
      amount: 18000,
      tags: [],
    },
  ],
};

const palette = ["#37bdd0", "#ff9300", "#6177ee", "#d66bb7", "#66cf91", "#f1c65b"];

const elements = {
  viewTitle: document.querySelector("#viewTitle"),
  toggleAccountsButton: document.querySelector("#toggleAccountsButton"),
  viewLinks: document.querySelectorAll("[data-view-link]"),
  views: document.querySelectorAll("[data-view]"),
  operationModal: document.querySelector("#operationModal"),
  operationModalTitle: document.querySelector("#operationModalTitle"),
  operationSubmitButton: document.querySelector("#operationSubmitButton"),
  openOperationForm: document.querySelector("#openOperationForm"),
  closeOperationForm: document.querySelector("#closeOperationForm"),
  closeOperationBackdrop: document.querySelector("#closeOperationBackdrop"),
  addAccountButton: document.querySelector("#addAccountButton"),
  editAccountsButton: document.querySelector("#editAccountsButton"),
  accountTypeModal: document.querySelector("#accountTypeModal"),
  closeAccountTypeModal: document.querySelector("#closeAccountTypeModal"),
  closeAccountTypeBackdrop: document.querySelector("#closeAccountTypeBackdrop"),
  accountModal: document.querySelector("#accountModal"),
  accountModalTitle: document.querySelector("#accountModalTitle"),
  accountForm: document.querySelector("#accountForm"),
  accountSubmitButton: document.querySelector("#accountSubmitButton"),
  closeAccountModal: document.querySelector("#closeAccountModal"),
  closeAccountBackdrop: document.querySelector("#closeAccountBackdrop"),
  accountNameInput: document.querySelector("#accountNameInput"),
  accountIconInput: document.querySelector("#accountIconInput"),
  accountColorInput: document.querySelector("#accountColorInput"),
  accountGroupInput: document.querySelector("#accountGroupInput"),
  accountBalanceInput: document.querySelector("#accountBalanceInput"),
  accountGroupModal: document.querySelector("#accountGroupModal"),
  accountGroupModalTitle: document.querySelector("#accountGroupModalTitle"),
  accountGroupForm: document.querySelector("#accountGroupForm"),
  accountGroupSubmitButton: document.querySelector("#accountGroupSubmitButton"),
  closeAccountGroupModal: document.querySelector("#closeAccountGroupModal"),
  closeAccountGroupBackdrop: document.querySelector("#closeAccountGroupBackdrop"),
  accountGroupNameInput: document.querySelector("#accountGroupNameInput"),
  accountGroupIconInput: document.querySelector("#accountGroupIconInput"),
  accountGroupColorInput: document.querySelector("#accountGroupColorInput"),
  deleteAccountGroupAction: document.querySelector("#deleteAccountGroupAction"),
  prevMonthButton: document.querySelector("#prevMonthButton"),
  nextMonthButton: document.querySelector("#nextMonthButton"),
  exportDataButton: document.querySelector("#exportDataButton"),
  importDataButton: document.querySelector("#importDataButton"),
  toast: document.querySelector("#toast"),
  monthTabs: document.querySelector("#monthTabs"),
  monthSelect: document.querySelector("#monthSelect"),
  periodLabel: document.querySelector("#periodLabel"),
  periodBalanceValue: document.querySelector("#periodBalanceValue"),
  periodBalanceLabel: document.querySelector("#periodBalanceLabel"),
  balanceInsight: document.querySelector("#balanceInsight"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  remainingTotal: document.querySelector("#remainingTotal"),
  incomeBar: document.querySelector("#incomeBar"),
  expenseBar: document.querySelector("#expenseBar"),
  remainingBar: document.querySelector("#remainingBar"),
  planChart: document.querySelector("#planChart"),
  planPageChart: document.querySelector("#planPageChart"),
  planCharts: document.querySelectorAll("[data-plan-chart]"),
  planDayTotals: document.querySelector("#planDayTotals"),
  planPageDayTotals: document.querySelector("#planPageDayTotals"),
  planBalanceRow: document.querySelector("#planBalanceRow"),
  planPageBalanceRow: document.querySelector("#planPageBalanceRow"),
  planDayOperations: document.querySelector("#planDayOperations"),
  planPageDayOperations: document.querySelector("#planPageDayOperations"),
  planSummaryGrid: document.querySelector("#planSummaryGrid"),
  planInsight: document.querySelector("#planInsight"),
  upcomingPlansList: document.querySelector("#upcomingPlansList"),
  donutChart: document.querySelector("#donutChart"),
  categoryList: document.querySelector("#categoryList"),
  reportCategorySubtitle: document.querySelector("#reportCategorySubtitle"),
  reportSummary: document.querySelector("#reportSummary"),
  reportTotal: document.querySelector("#reportTotal"),
  expenseSubtitle: document.querySelector("#expenseSubtitle"),
  settingsStats: document.querySelector("#settingsStats"),
  settingsGroups: document.querySelector("#settingsGroups"),
  accountsList: document.querySelector("#accountsList"),
  operationsList: document.querySelector("#operationsList"),
  form: document.querySelector("#operationForm"),
  resetDemoButton: document.querySelector("#resetDemoButton"),
  dateInput: document.querySelector("#dateInput"),
  typeInput: document.querySelector("#typeInput"),
  statusInput: document.querySelector("#statusInput"),
  accountInput: document.querySelector("#accountInput"),
  toAccountInput: document.querySelector("#toAccountInput"),
  categoryInput: document.querySelector("#categoryInput"),
  tagsInput: document.querySelector("#tagsInput"),
  titleInput: document.querySelector("#titleInput"),
  amountInput: document.querySelector("#amountInput"),
  amountPanel: document.querySelector("#amountPanel"),
  amountPrefix: document.querySelector("#amountPrefix"),
  operationFormError: document.querySelector("#operationFormError"),
  accountInputLabel: document.querySelector("#accountInputLabel"),
  typeButtons: document.querySelectorAll("[data-type-option]"),
  statusButtons: document.querySelectorAll("[data-status-option]"),
  deleteOperationAction: document.querySelector("#deleteOperationAction"),
};

let state = loadState();
let planHover = { month: "", day: null };
let lastPlanContext = null;
let activeView = "operations";
let selectedAccountId = "all";
let editingOperationId = null;
let editingAccountId = null;
let editingAccountGroupId = null;
let accountsEditing = false;
let accountsPaneCollapsed = false;
let accountsTreeExpanded = true;
const collapsedAccountGroups = new Set();

init();

function init() {
  ensureDefaultDate();
  renderStaticControls();
  renderMonthOptions();
  updateFormMode();
  render();

  elements.monthSelect.addEventListener("change", render);
  elements.viewLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveView(link.dataset.viewLink);
    });
  });
  elements.toggleAccountsButton?.addEventListener("click", () => setAccountsPaneCollapsed(!accountsPaneCollapsed));
  elements.openOperationForm.addEventListener("click", () => openOperationModal());
  elements.closeOperationForm.addEventListener("click", closeOperationModal);
  elements.closeOperationBackdrop.addEventListener("click", closeOperationModal);
  elements.addAccountButton.addEventListener("click", openAccountTypeModal);
  elements.editAccountsButton.addEventListener("click", toggleAccountsEditing);
  elements.closeAccountTypeModal.addEventListener("click", closeAccountTypeModal);
  elements.closeAccountTypeBackdrop.addEventListener("click", closeAccountTypeModal);
  elements.accountTypeModal.addEventListener("click", handleAccountTypeChoice);
  elements.closeAccountModal.addEventListener("click", closeAccountModal);
  elements.closeAccountBackdrop.addEventListener("click", closeAccountModal);
  elements.accountForm.addEventListener("submit", saveAccountFromForm);
  elements.closeAccountGroupModal.addEventListener("click", closeAccountGroupModal);
  elements.closeAccountGroupBackdrop.addEventListener("click", closeAccountGroupModal);
  elements.accountGroupForm.addEventListener("submit", saveAccountGroupFromForm);
  elements.prevMonthButton?.addEventListener("click", () => shiftMonth(-1));
  elements.nextMonthButton?.addEventListener("click", () => shiftMonth(1));
  elements.monthTabs.addEventListener("click", handleMonthTabClick);
  elements.accountsList.addEventListener("click", handleAccountClick);
  elements.operationsList.addEventListener("click", handleOperationClick);
  elements.operationsList.addEventListener("keydown", handleOperationKeydown);
  elements.exportDataButton.addEventListener("click", exportState);
  elements.importDataButton.addEventListener("click", importStateFromPrompt);
  elements.settingsGroups?.addEventListener("click", handleSettingsGroupAction);
  elements.planCharts.forEach((chart) => {
    chart.addEventListener("mousemove", handlePlanChartMove);
    chart.addEventListener("mouseleave", clearPlanChartHover);
  });
  elements.typeInput.addEventListener("change", () => {
    clearOperationFormError();
    updateFormMode();
    renderCategoryOptions();
  });
  elements.typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearOperationFormError();
      elements.typeInput.value = button.dataset.typeOption;
      updateFormMode();
      renderCategoryOptions();
    });
  });
  elements.statusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearOperationFormError();
      elements.statusInput.value = button.dataset.statusOption;
      syncOperationSheetState();
    });
  });
  elements.amountInput.addEventListener("input", () => {
    clearOperationFormError();
    syncOperationSheetState();
  });
  [elements.accountInput, elements.toAccountInput, elements.categoryInput, elements.dateInput].forEach((input) => {
    input?.addEventListener("change", clearOperationFormError);
  });
  elements.accountInput.addEventListener("change", ensureTransferTargetIsDifferent);
  elements.deleteOperationAction.addEventListener("click", () => {
    if (!editingOperationId) return;
    const id = editingOperationId;
    closeOperationModal();
    deleteOperation(id);
  });
  elements.deleteAccountGroupAction?.addEventListener("click", () => {
    if (!editingAccountGroupId) return;
    deleteAccountGroup(editingAccountGroupId);
  });
  elements.form.addEventListener("submit", addOperation);
  elements.resetDemoButton.addEventListener("click", resetDemoData);
  document.addEventListener("keydown", handleGlobalKeydown);
  setActiveView(activeView);
  setAccountsPaneCollapsed(accountsPaneCollapsed);
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch {
      return structuredClone(demoState);
    }
  }

  const legacyOperations = localStorage.getItem(LEGACY_OPERATIONS_KEY);
  if (legacyOperations) {
    try {
      const parsed = JSON.parse(legacyOperations);
      if (Array.isArray(parsed)) return normalizeState({ ...demoState, operations: parsed });
    } catch {
      return structuredClone(demoState);
    }
  }

  return structuredClone(demoState);
}

function normalizeState(source) {
  const normalized = structuredClone(demoState);
  normalized.accountGroups = Array.isArray(source.accountGroups) ? source.accountGroups : normalized.accountGroups;
  normalized.accounts = Array.isArray(source.accounts) ? source.accounts : normalized.accounts;
  normalized.categories = Array.isArray(source.categories) ? source.categories : normalized.categories;
  normalized.tags = Array.isArray(source.tags) ? source.tags : normalized.tags;
  normalized.operations = Array.isArray(source.operations)
    ? source.operations.map(normalizeOperation)
    : normalized.operations;
  return normalized;
}

function normalizeOperation(op) {
  const category = findCategoryByTitle(op.category, op.type);
  return {
    id: op.id || createId(),
    date: op.date || "2026-04-01",
    type: op.type || "expense",
    status: op.status || "fact",
    accountId: op.accountId || "account-main",
    fromAccountId: op.fromAccountId || op.accountId || "account-main",
    toAccountId: op.toAccountId || "account-savings",
    categoryId: op.categoryId || category?.id || defaultCategoryId(op.type),
    title: op.title || "",
    amount: Number(op.amount || 0),
    tags: Array.isArray(op.tags) ? op.tags : [],
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureDefaultDate() {
  const selectedMonth = elements.monthSelect?.value || getCurrentMonthKey();
  const currentMonth = getCurrentMonthKey();
  const day = selectedMonth === currentMonth
    ? clamp(new Date().getDate(), 1, daysInMonth(selectedMonth))
    : selectedMonth < currentMonth
      ? daysInMonth(selectedMonth)
      : 1;

  elements.dateInput.value = `${selectedMonth}-${String(day).padStart(2, "0")}`;
}

function renderStaticControls() {
  renderAccountOptions();
  renderCategoryOptions();
}

function renderAccountOptions() {
  const options = orderedAccounts()
    .map((account) => `<option value="${account.id}">${account.icon} ${escapeHtml(account.title)}</option>`)
    .join("");

  elements.accountInput.innerHTML = options;
  elements.toAccountInput.innerHTML = options;
  elements.toAccountInput.value = state.accounts[1]?.id || state.accounts[0]?.id || "";
}

function renderAccountGroupOptions(selected = "") {
  elements.accountGroupInput.innerHTML = `
    <option value="">Без группы</option>
    ${orderedAccountGroups()
      .map((group) => `<option value="${group.id}">${group.icon || "📁"} ${escapeHtml(group.title)}</option>`)
      .join("")}
  `;
  elements.accountGroupInput.value = selected || "";
}

function renderCategoryOptions() {
  const type = elements.typeInput.value;
  const categories = orderedCategories().filter((category) => category.type === type);
  elements.categoryInput.innerHTML = `<option value="">Без категории</option>` + categories
    .map((category) => `<option value="${category.id}">${category.icon} ${escapeHtml(category.title)}</option>`)
    .join("");
}

function renderMonthOptions() {
  const months = Array.from(new Set(state.operations.map((op) => op.date.slice(0, 7)))).sort();
  const selected = elements.monthSelect.value || months[0] || getCurrentMonthKey();

  elements.monthSelect.innerHTML = months
    .map((month) => `<option value="${month}">${formatMonth(month)}</option>`)
    .join("");

  if (!months.includes(selected)) {
    const option = document.createElement("option");
    option.value = selected;
    option.textContent = formatMonth(selected);
    elements.monthSelect.append(option);
  }

  elements.monthSelect.value = selected;
  renderMonthTabs(selected);
}

function updateFormMode() {
  const isTransfer = elements.typeInput.value === "transfer";
  document.querySelectorAll(".transfer-only").forEach((item) => item.classList.toggle("hidden", !isTransfer));
  document.querySelectorAll(".category-field").forEach((item) => item.classList.toggle("hidden", isTransfer));
  if (isTransfer) ensureTransferTargetIsDifferent();
  if (elements.accountInputLabel) {
    elements.accountInputLabel.textContent = isTransfer ? "Откуда" : "Счёт";
  } else {
    elements.accountInput.closest("label").firstChild.textContent = isTransfer ? "Откуда перевести" : "Счёт";
  }
  syncOperationSheetState();
}

function syncOperationSheetState() {
  const type = elements.typeInput.value;
  elements.typeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.typeOption === type);
  });
  elements.statusButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.statusOption === elements.statusInput.value);
  });
  if (elements.amountPanel) elements.amountPanel.dataset.type = type;
  if (elements.amountPrefix) {
    elements.amountPrefix.textContent = type === "expense" ? "−" : type === "transfer" ? "" : "+";
  }
  if (elements.deleteOperationAction) {
    elements.deleteOperationAction.classList.toggle("hidden", !editingOperationId);
    elements.deleteOperationAction.closest(".operation-danger-zone")?.classList.toggle("hidden", !editingOperationId);
  }
}

function render() {
  const month = elements.monthSelect.value || "2026-04";
  const monthOperations = state.operations
    .filter((op) => op.date.startsWith(month))
    .filter(matchesSelectedAccount);
  const factOperations = monthOperations.filter((op) => op.status === "fact");
  const boundaryDay = getFactBoundaryDay(month);
  const futurePlanOperations = monthOperations.filter((op) => op.status === "plan" && getOperationDay(op) > boundaryDay);

  const income = sumBy(factOperations, "income");
  const expense = sumBy(factOperations, "expense");
  const planIncome = sumBy(futurePlanOperations, "income");
  const planExpense = sumBy(futurePlanOperations, "expense");
  const remaining = income - expense;
  const plannedRemaining = income + planIncome - expense - planExpense;
  const spentShare = income > 0 ? Math.round((expense / income) * 100) : 0;

  updateHeader(month);
  renderMonthTabs(month);
  updateDashboard({ month, income, expense, remaining, spentShare });
  updatePlan({ month, monthOperations, plannedRemaining });
  updatePlanPage({ month, monthOperations, income, expense, remaining, planIncome, planExpense, plannedRemaining });
  updateReport({ month, monthOperations, expense });
  updateAccounts();
  updateSettingsSummary();
  updateOperations(monthOperations);
}

function updateHeader(month) {
  if (elements.periodLabel) {
    elements.periodLabel.textContent = `${capitalizeFirst(formatMonth(month))} · ${getSelectedAccountLabel()}`;
  }
}

function updateDashboard({ month, income, expense, remaining, spentShare }) {
  const safeIncome = Math.max(income, 0);
  const expensePercent = safeIncome > 0 ? clamp((expense / safeIncome) * 100, 0, 100) : 0;
  const remainingPercent = safeIncome > 0 ? clamp((remaining / safeIncome) * 100, 0, 100) : 0;
  const monthLabel = monthNamePrepositional(month);
  const periodLabel = formatMonth(month).toLowerCase();
  const previousMonth = getPreviousMonthKey(month);
  const previousOperations = state.operations
    .filter((op) => op.date.startsWith(previousMonth))
    .filter(matchesSelectedAccount)
    .filter((op) => op.status === "fact");
  const previousIncome = sumBy(previousOperations, "income");
  const previousExpense = sumBy(previousOperations, "expense");
  const previousText = previousIncome > 0 && previousExpense > 0
    ? `В прошлом месяце на расходы ушло ${Math.round((previousExpense / previousIncome) * 100)}% от дохода.`
    : "В прошлом месяце расходов не было.";

  elements.periodBalanceValue.textContent = formatSignedMoney(remaining);
  elements.periodBalanceValue.classList.toggle("income-text", remaining > 0);
  elements.periodBalanceValue.classList.toggle("expense-text", remaining < 0);
  elements.periodBalanceLabel.textContent = `Баланс за ${periodLabel}`;
  elements.balanceInsight.textContent = safeIncome > 0
    ? `В ${monthLabel} на расходы ушло ${spentShare}% от дохода.\n${previousText}`
    : `В ${monthLabel} доходов ещё не было.\n${previousText}`;
  elements.incomeTotal.textContent = formatMoney(income);
  elements.expenseTotal.textContent = formatMoney(expense);
  elements.remainingTotal.textContent = formatMoney(remaining);

  elements.incomeBar.style.width = safeIncome > 0 ? "100%" : "0%";
  elements.expenseBar.style.width = `${expensePercent}%`;
  elements.remainingBar.style.width = `${remainingPercent}%`;
}

function updatePlan({ month, monthOperations, plannedRemaining }) {
  const boundaryDay = getFactBoundaryDay(month);
  const selectedDay = planHover.month === month && planHover.day ? planHover.day : Math.max(1, boundaryDay || 1);
  const summary = computeDaySummary(month, monthOperations, selectedDay);
  const totalsMarkup = buildPlanDayTotals(summary);
  const dashboardChartMarkup = buildPlanChart(month, monthOperations, selectedDay, { compact: true });
  const pageChartMarkup = buildPlanChart(month, monthOperations, selectedDay);
  const dashboardBalanceMarkup = buildPlanBalanceRow(month, selectedDay, summary, { compact: true });
  const pageBalanceMarkup = buildPlanBalanceRow(month, selectedDay, summary);
  const dashboardOperationsMarkup = buildPlanDayOperations(month, monthOperations, selectedDay, { compact: true });
  const pageOperationsMarkup = buildPlanDayOperations(month, monthOperations, selectedDay);

  lastPlanContext = { month, monthOperations, plannedRemaining };
  [elements.planDayTotals, elements.planPageDayTotals].forEach((node) => {
    if (node) node.innerHTML = totalsMarkup;
  });
  if (elements.planChart) elements.planChart.innerHTML = dashboardChartMarkup;
  if (elements.planPageChart) elements.planPageChart.innerHTML = pageChartMarkup;
  if (elements.planBalanceRow) elements.planBalanceRow.innerHTML = dashboardBalanceMarkup;
  if (elements.planPageBalanceRow) elements.planPageBalanceRow.innerHTML = pageBalanceMarkup;
  if (elements.planDayOperations) elements.planDayOperations.innerHTML = dashboardOperationsMarkup;
  if (elements.planPageDayOperations) elements.planPageDayOperations.innerHTML = pageOperationsMarkup;
}

function updatePlanPage({ month, monthOperations, income, expense, remaining, planIncome, planExpense, plannedRemaining }) {
  if (!elements.planSummaryGrid || !elements.planInsight || !elements.upcomingPlansList) return;

  const boundaryDay = getFactBoundaryDay(month);
  const plannedOperations = monthOperations
    .filter((op) => op.status === "plan")
    .sort((a, b) => a.date.localeCompare(b.date));
  const overdue = plannedOperations.filter((op) => getOperationDay(op) <= boundaryDay);
  const periodPlanIncome = sumBy(plannedOperations, "income");
  const periodPlanExpense = sumBy(plannedOperations, "expense");
  const periodPlanDelta = periodPlanIncome - periodPlanExpense;
  const remainingClass = plannedRemaining >= 0 ? "income" : "expense";
  const deltaClass = periodPlanDelta >= 0 ? "income" : "expense";

  elements.planSummaryGrid.innerHTML = `
    ${buildSummaryTile("Факт сейчас", formatMoney(remaining), `${formatMoney(income)} доход · ${formatMoney(expense)} расход`, "accent")}
    ${buildSummaryTile("Планы периода", formatSignedMoney(periodPlanDelta), `${formatMoney(periodPlanIncome)} придёт · ${formatMoney(periodPlanExpense)} уйдёт`, deltaClass)}
    ${buildSummaryTile("Прогноз остатка", formatMoney(plannedRemaining), plannedRemaining >= 0 ? "Месяц закрывается в плюс" : "Нужен запас или перенос", remainingClass)}
  `;

  if (overdue.length) {
    elements.planInsight.textContent = `Есть незакрытые планы: ${overdue.length}. Их стоит отметить фактом или перенести, иначе прогноз будет выглядеть бодрее, чем реальность.`;
  } else {
    elements.planInsight.textContent = plannedRemaining >= 0
      ? `После будущих планов остаётся ${formatMoney(plannedRemaining)}. Самое время держать курс.`
      : `По будущему плану не хватает ${formatMoney(Math.abs(plannedRemaining))}. Лучше перенести расход или добавить поступление.`;
  }

  elements.upcomingPlansList.innerHTML = plannedOperations.length
    ? plannedOperations.map(renderUpcomingPlanItem).join("")
    : `<div class="empty">До конца периода плановых операций нет</div>`;
}

function updateReport({ month, monthOperations, expense }) {
  const factOperations = monthOperations.filter((op) => op.status === "fact");
  const categories = groupExpensesByCategory(factOperations);
  const previousMonth = getPreviousMonthKey(month);
  const previousFactOperations = state.operations
    .filter((op) => op.date.startsWith(previousMonth))
    .filter(matchesSelectedAccount)
    .filter((op) => op.status === "fact");
  const previousCategories = groupExpensesByCategory(previousFactOperations);
  const previousCategoryAmounts = new Map(previousCategories.map((item) => [item.id, item.amount]));
  const monthLabel = formatMonth(month).toLowerCase();
  const factIncome = sumBy(factOperations, "income");
  const previousIncome = sumBy(previousFactOperations, "income");
  const previousExpense = sumBy(previousFactOperations, "expense");
  const balance = factIncome - expense;
  const previousBalance = previousIncome - previousExpense;
  const topCategory = categories[0];
  const spentShare = factIncome > 0 ? Math.round((expense / factIncome) * 100) : 0;
  const previousShare = previousIncome > 0 ? Math.round((previousExpense / previousIncome) * 100) : 0;

  if (elements.reportTotal) elements.reportTotal.textContent = formatMoney(expense);
  if (elements.expenseSubtitle) elements.expenseSubtitle.textContent = `Факт за ${monthLabel}`;
  if (elements.reportSummary) {
    elements.reportSummary.innerHTML = `
      ${buildSummaryTile("Доходы", formatMoney(factIncome), formatMoneyComparison(factIncome, previousIncome), "income")}
      ${buildSummaryTile("Расходы", formatMoney(expense), formatMoneyComparison(expense, previousExpense), "expense")}
      ${buildSummaryTile("Итог", formatSignedMoney(balance), formatBalanceComparison(balance, previousBalance), balance >= 0 ? "income" : "expense")}
      ${buildSummaryTile("Доля расходов", `${spentShare}%`, previousIncome > 0 ? `В прошлом месяце ${previousShare}%` : "В прошлом месяце доходов нет", "")}
    `;
  }

  if (elements.reportCategorySubtitle) {
    elements.reportCategorySubtitle.textContent = topCategory
      ? `${topCategory.title}: ${formatMoney(topCategory.amount)} за ${monthLabel}`
      : factOperations.length
        ? `Расходов за ${monthLabel} нет`
        : `Фактических операций за ${monthLabel} нет`;
  }

  if (!categories.length) {
    elements.donutChart.style.background = "conic-gradient(#ece8dd 0 100%)";
    elements.categoryList.innerHTML = factOperations.length
      ? `<div class="empty report-empty">Расходов нет: в факте только доходы или переводы.</div>`
      : `<div class="empty report-empty">За период нет фактических операций.</div>`;
    return;
  }

  let cursor = 0;
  const gradientParts = categories.map((item, index) => {
    const start = cursor;
    const size = (item.amount / expense) * 100;
    cursor += size;
    return `${item.color || palette[index % palette.length]} ${start}% ${cursor}%`;
  });

  elements.donutChart.style.background = `conic-gradient(${gradientParts.join(", ")})`;
  elements.categoryList.innerHTML = categories
    .slice(0, 5)
    .map((item) => {
      const percent = expense > 0 ? Math.round((item.amount / expense) * 100) : 0;
      const previousAmount = previousCategoryAmounts.get(item.id) || 0;
      return `
        <div class="category-pill">
          <div class="category-row">
            <span class="category-left">
              <i class="category-emoji" style="--item-color:${item.color}">${item.icon}</i>
              <strong>${escapeHtml(item.title)}</strong>
            </span>
            <span class="category-meta">${formatMoney(item.amount)} · ${percent}% · ${escapeHtml(formatCategoryComparison(item.amount, previousAmount))}</span>
          </div>
          <span class="category-bar" aria-hidden="true">
            <i style="width:${percent}%; background:${item.color || palette[0]}"></i>
          </span>
        </div>
      `;
    })
    .join("");
}

function updateAccounts() {
  const balances = calculateAccountBalances();
  const total = orderedAccounts().reduce((acc, account) => acc + (balances.get(account.id) || 0), 0);
  const groups = orderedAccountGroups();
  const groupRows = groups
    .map((group) => {
      const accounts = orderedAccounts().filter((account) => account.groupId === group.id);
      const groupBalance = accounts.reduce((acc, account) => acc + (balances.get(account.id) || 0), 0);
      const groupExpanded = !collapsedAccountGroups.has(group.id);
      return `
        <div class="account-group-block ${groupExpanded ? "" : "collapsed"}">
          <div class="account-group-row ${selectedAccountId === `group:${group.id}` ? "active" : ""}" style="--account-color:${group.color}">
            ${renderAccountDisclosureButton({
              expanded: groupExpanded,
              label: `${groupExpanded ? "Скрыть" : "Показать"} счета группы ${group.title}`,
              attribute: `data-account-group-toggle="${group.id}"`,
            })}
            <button class="account-group-select" type="button" data-account-group-id="${group.id}">
              <span class="account-group-icon" aria-hidden="true">${group.icon || "📁"}</span>
              <strong>${escapeHtml(group.title)}</strong>
            </button>
            <em class="${groupBalance >= 0 ? "income-text" : "expense-text"}">${formatSignedMoney(groupBalance)}</em>
          </div>
          <div class="account-group-children">
            ${accounts.map((account) => renderAccountCard(account, balances)).join("")}
          </div>
        </div>
      `;
    })
    .join("");
  const ungroupedAccounts = orderedAccounts()
    .filter((account) => !account.groupId || !groups.some((group) => group.id === account.groupId))
    .map((account) => renderAccountCard(account, balances))
    .join("");

  elements.accountsList.innerHTML = `
    <div class="account-group-row account-all-row ${selectedAccountId === "all" ? "active" : ""}">
      ${renderAccountDisclosureButton({
        expanded: accountsTreeExpanded,
        label: accountsTreeExpanded ? "Скрыть все счета" : "Показать все счета",
        attribute: "data-accounts-toggle",
      })}
      <button class="account-group-select" type="button" data-account-id="all">
        <strong>Все счета</strong>
      </button>
      <em class="${total >= 0 ? "income-text" : "expense-text"}">${formatSignedMoney(total)}</em>
    </div>
    ${accountsTreeExpanded ? groupRows : ""}
    ${accountsTreeExpanded ? ungroupedAccounts : ""}
  `;
}

function renderAccountDisclosureButton({ expanded, label, attribute }) {
  return `
    <button class="account-disclosure" type="button" ${attribute} aria-expanded="${expanded}" aria-label="${escapeHtml(label)}">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 10 4 4 4-4"/>
      </svg>
    </button>
  `;
}

function updateSettingsSummary() {
  if (!elements.settingsStats) return;

  const factCount = state.operations.filter((op) => op.status === "fact").length;
  const planCount = state.operations.filter((op) => op.status === "plan").length;

  elements.settingsStats.innerHTML = `
    <div><span>Счета</span><strong>${state.accounts.length}</strong></div>
    <div><span>Операции</span><strong>${state.operations.length}</strong></div>
    <div><span>Факт / план</span><strong>${factCount} / ${planCount}</strong></div>
    <div><span>Категории</span><strong>${state.categories.length}</strong></div>
  `;

  if (!elements.settingsGroups) return;
  const groups = orderedAccountGroups();
  elements.settingsGroups.innerHTML = groups.length
    ? groups.map((group) => {
      const accountsCount = state.accounts.filter((account) => account.groupId === group.id).length;
      return `
        <div class="settings-group-row" style="--account-color:${group.color}">
          <span><i>${group.icon || "📁"}</i><strong>${escapeHtml(group.title)}</strong><em>${accountsCount} сч.</em></span>
          <button class="settings-danger-button" type="button" data-settings-delete-group="${group.id}">Удалить только группу</button>
        </div>
      `;
    }).join("")
    : "";
}

function handleSettingsGroupAction(event) {
  const deleteButton = event.target.closest("[data-settings-delete-group]");
  if (!deleteButton) return;
  deleteAccountGroup(deleteButton.dataset.settingsDeleteGroup);
}

function renderAccountCard(account, balances) {
  const balance = balances.get(account.id) || 0;
  return `
    <button class="account-card ${selectedAccountId === account.id ? "active" : ""}" type="button" data-account-id="${account.id}" style="--account-color:${account.color}">
      <div class="account-icon" aria-hidden="true">${account.icon}</div>
      <div class="account-title">${escapeHtml(account.title)}</div>
      <div class="account-balance ${balance >= 0 ? "income-text" : "expense-text"}">${formatSignedMoney(balance)}</div>
    </button>
  `;
}

function updateOperations(monthOperations) {
  const sorted = [...monthOperations].sort((a, b) => b.date.localeCompare(a.date));

  if (!sorted.length) {
    elements.operationsList.innerHTML = `<div class="empty">В этом месяце пока нет операций</div>`;
    return;
  }

  const grouped = groupByDate(sorted);
  elements.operationsList.innerHTML = grouped
    .map(([date, operations]) => {
      const dayIncome = sumBy(operations, "income");
      const dayExpense = sumBy(operations, "expense");
      return `
        <section class="day-group">
          <div class="day-head">
            <span>${formatOperationDayLabel(date)}</span>
            <strong>${formatDaySummary(dayIncome, dayExpense)}</strong>
          </div>
          <div class="day-items">
            ${operations.map(renderOperationItem).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderOperationItem(op) {
  const account = getAccount(op.accountId || op.fromAccountId);
  const toAccount = getAccount(op.toAccountId);
  const category = getCategory(op.categoryId);
  const isTransfer = op.type === "transfer";
  const amountClass = op.type === "income" ? "income" : op.type === "expense" ? "expense" : "transfer";
  const amountLabel = isTransfer ? formatMoney(op.amount) : `${op.type === "income" ? "+" : "-"}${formatMoney(op.amount)}`;
  const title = isTransfer
    ? `Перевод: ${account?.title || "Счёт"} → ${toAccount?.title || "Счёт"}`
    : category?.title || "Без категории";
  const icon = isTransfer ? "↔" : category?.icon || "•";
  const color = isTransfer ? "#2d8ccc" : category?.color || "#565963";

  return `
    <div class="operation-item" role="button" tabindex="0" data-operation-id="${op.id}">
      <div class="op-icon ${amountClass}" style="--item-color:${color}">${icon}</div>
      <div class="op-main">
        <div class="op-title">${escapeHtml(title)}</div>
        <div class="op-meta" data-operation-day="${escapeHtml(formatOperationDayLabel(op.date))}">${escapeHtml(account?.title || "Счёт")}</div>
      </div>
      <div class="op-amount ${amountClass}">${amountLabel}</div>
    </div>
  `;
}

function prepareNewOperationForm() {
  elements.form.reset();
  ensureDefaultDate();
  renderStaticControls();

  const defaultAccountId = getDefaultOperationAccountId();
  const latest = getLatestOperationForDefaults(defaultAccountId);
  if (defaultAccountId) elements.accountInput.value = defaultAccountId;

  if (latest && latest.type !== "transfer") {
    elements.typeInput.value = latest.type;
    renderCategoryOptions();
    elements.categoryInput.value = latest.categoryId || "";
  }

  elements.statusInput.value = "fact";
  elements.toAccountInput.value = getDefaultTransferTargetId(elements.accountInput.value);
  updateFormMode();
}

function getDefaultOperationAccountId() {
  if (selectedAccountId !== "all" && !selectedAccountId.startsWith("group:") && getAccount(selectedAccountId)) {
    return selectedAccountId;
  }

  if (selectedAccountId.startsWith("group:")) {
    const groupId = selectedAccountId.replace("group:", "");
    const groupAccount = orderedAccounts().find((account) => account.groupId === groupId);
    if (groupAccount) return groupAccount.id;
  }

  return orderedAccounts()[0]?.id || "";
}

function getDefaultTransferTargetId(fromAccountId) {
  return orderedAccounts().find((account) => account.id !== fromAccountId)?.id || fromAccountId || "";
}

function getLatestOperationForDefaults(accountId) {
  const month = elements.monthSelect.value || getCurrentMonthKey();
  const candidates = [...state.operations]
    .filter((op) => op.type !== "transfer")
    .filter((op) => !accountId || op.accountId === accountId)
    .filter((op) => op.date.startsWith(month))
    .sort((a, b) => b.date.localeCompare(a.date));

  return candidates[0] || null;
}

function ensureTransferTargetIsDifferent() {
  if (elements.typeInput.value !== "transfer") return;
  if (elements.accountInput.value !== elements.toAccountInput.value) return;
  elements.toAccountInput.value = getDefaultTransferTargetId(elements.accountInput.value);
}

function showOperationFormError(message) {
  if (!elements.operationFormError) return;
  elements.operationFormError.textContent = message;
  elements.operationFormError.classList.remove("hidden");
}

function clearOperationFormError() {
  if (!elements.operationFormError) return;
  elements.operationFormError.textContent = "";
  elements.operationFormError.classList.add("hidden");
}

function addOperation(event) {
  event.preventDefault();

  const amount = Number(elements.amountInput.value);
  if (!amount || amount <= 0) {
    showOperationFormError("Укажи сумму больше нуля.");
    elements.amountInput.focus();
    return;
  }

  const type = elements.typeInput.value;
  const existing = editingOperationId ? state.operations.find((op) => op.id === editingOperationId) : null;
  const operation = {
    id: existing?.id || createId(),
    date: elements.dateInput.value,
    type,
    status: elements.statusInput.value,
    accountId: elements.accountInput.value,
    fromAccountId: elements.accountInput.value,
    toAccountId: elements.toAccountInput.value,
    categoryId: type === "transfer" ? "" : elements.categoryInput.value,
    title: elements.titleInput.value.trim(),
    amount,
    tags: [],
  };

  if (type === "transfer" && operation.fromAccountId === operation.toAccountId) {
    showOperationFormError("Для перевода выбери разные счета.");
    elements.toAccountInput.focus();
    return;
  }

  operation.tags = parseTags(elements.tagsInput.value);

  if (existing) {
    Object.assign(existing, operation);
  } else {
    state.operations.push(operation);
  }
  saveState();
  renderMonthOptions();
  elements.monthSelect.value = operation.date.slice(0, 7);
  render();
  elements.form.reset();
  elements.dateInput.value = operation.date;
  renderStaticControls();
  updateFormMode();
  closeOperationModal();
  showToast(existing ? "Операция обновлена" : "Операция добавлена");
}

function setActiveView(view) {
  activeView = view || "operations";
  const titles = {
    operations: "Операции",
    reports: "Отчёт",
    plans: "План",
    accounts: "Счета",
    settings: "Настройки",
  };

  if (elements.viewTitle) elements.viewTitle.textContent = titles[activeView] || "Операции";
  document.body.dataset.activeView = activeView;
  elements.viewLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === activeView);
  });
  elements.views.forEach((viewNode) => {
    viewNode.classList.toggle("active", viewNode.dataset.view === activeView);
  });
}

function setAccountsPaneCollapsed(collapsed) {
  accountsPaneCollapsed = collapsed;
  document.body.classList.toggle("accounts-panel-collapsed", collapsed);
  if (!elements.toggleAccountsButton) return;
  elements.toggleAccountsButton.setAttribute("aria-expanded", String(!collapsed));
  elements.toggleAccountsButton.setAttribute("aria-label", collapsed ? "Показать счета" : "Скрыть счета");
}

function openOperationModal(operation = null) {
  editingOperationId = operation?.id || null;
  clearOperationFormError();
  elements.operationModalTitle.textContent = operation ? "Редактировать операцию" : "Добавить операцию";
  elements.operationSubmitButton.textContent = operation ? "✓ Сохранить операцию" : "✓ Сохранить операцию";
  if (operation) {
    elements.dateInput.value = operation.date;
    elements.typeInput.value = operation.type;
    elements.statusInput.value = operation.status;
    elements.accountInput.value = operation.accountId || operation.fromAccountId || "";
    elements.toAccountInput.value = operation.toAccountId || "";
    elements.titleInput.value = operation.title || "";
    elements.amountInput.value = operation.amount || "";
    elements.tagsInput.value = getTags(operation.tags).map((tag) => tag.title).join(", ");
    updateFormMode();
    renderCategoryOptions();
    elements.categoryInput.value = operation.categoryId || "";
  } else {
    prepareNewOperationForm();
  }
  syncOperationSheetState();
  elements.operationModal.classList.remove("hidden");
  elements.operationModal.setAttribute("aria-hidden", "false");
  elements.amountInput.focus();
}

function closeOperationModal() {
  editingOperationId = null;
  elements.operationModal.classList.add("hidden");
  elements.operationModal.setAttribute("aria-hidden", "true");
}

function handleAccountClick(event) {
  const allToggle = event.target.closest("[data-accounts-toggle]");
  if (allToggle) {
    accountsTreeExpanded = !accountsTreeExpanded;
    render();
    return;
  }

  const groupToggle = event.target.closest("[data-account-group-toggle]");
  if (groupToggle) {
    const groupId = groupToggle.dataset.accountGroupToggle;
    if (collapsedAccountGroups.has(groupId)) {
      collapsedAccountGroups.delete(groupId);
    } else {
      collapsedAccountGroups.add(groupId);
    }
    render();
    return;
  }

  const groupTarget = event.target.closest("[data-account-group-id]");
  if (groupTarget) {
    const group = state.accountGroups.find((item) => item.id === groupTarget.dataset.accountGroupId);
    if (!group) return;
    if (accountsEditing) {
      openAccountGroupModal(group);
      return;
    }
    selectedAccountId = `group:${group.id}`;
    render();
    return;
  }

  const target = event.target.closest("[data-account-id]");
  if (!target) return;
  if (accountsEditing && target.dataset.accountId !== "all") {
    const account = state.accounts.find((item) => item.id === target.dataset.accountId);
    if (account) openAccountModal(account);
    return;
  }
  selectedAccountId = target.dataset.accountId;
  render();
}

function handleOperationClick(event) {
  const target = event.target.closest("[data-operation-id]");
  if (!target) return;
  const operation = state.operations.find((op) => op.id === target.dataset.operationId);
  if (operation) openOperationModal(operation);
}

function handleOperationKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  const target = event.target.closest("[data-operation-id]");
  if (!target) return;
  event.preventDefault();
  const operation = state.operations.find((op) => op.id === target.dataset.operationId);
  if (operation) openOperationModal(operation);
}

function handleGlobalKeydown(event) {
  if (event.key !== "Escape") return;

  if (!elements.operationModal.classList.contains("hidden")) {
    closeOperationModal();
    return;
  }
  if (!elements.accountTypeModal.classList.contains("hidden")) {
    closeAccountTypeModal();
    return;
  }
  if (!elements.accountModal.classList.contains("hidden")) {
    closeAccountModal();
    return;
  }
  if (!elements.accountGroupModal.classList.contains("hidden")) {
    closeAccountGroupModal();
  }
}

function deleteOperation(id) {
  if (!confirm("Удалить операцию?")) return;
  state.operations = state.operations.filter((op) => op.id !== id);
  saveState();
  renderMonthOptions();
  render();
  showToast("Операция удалена");
}

function toggleAccountsEditing() {
  accountsEditing = !accountsEditing;
  document.body.classList.toggle("accounts-editing", accountsEditing);
  elements.editAccountsButton.classList.toggle("active", accountsEditing);
  showToast(accountsEditing ? "Режим редактирования счетов включён" : "Режим редактирования счетов выключен");
}

function openAccountTypeModal() {
  elements.accountTypeModal.classList.remove("hidden");
  elements.accountTypeModal.setAttribute("aria-hidden", "false");
}

function closeAccountTypeModal() {
  elements.accountTypeModal.classList.add("hidden");
  elements.accountTypeModal.setAttribute("aria-hidden", "true");
}

function handleAccountTypeChoice(event) {
  const target = event.target.closest("[data-account-create-type]");
  if (!target) return;
  closeAccountTypeModal();
  if (target.dataset.accountCreateType === "group") {
    openAccountGroupModal();
  } else {
    openAccountModal();
  }
}

function openAccountModal(account = null) {
  editingAccountId = account?.id || null;
  renderAccountGroupOptions(account?.groupId || "");
  elements.accountModalTitle.textContent = account ? "Редактировать счёт" : "Новый счёт";
  elements.accountSubmitButton.textContent = account ? "Сохранить счёт" : "Создать счёт";
  elements.accountNameInput.value = account?.title || "";
  elements.accountIconInput.value = account?.icon || "💳";
  elements.accountColorInput.value = account?.color || palette[state.accounts.length % palette.length] || "#57be7a";
  elements.accountBalanceInput.value = account?.initialBalance ?? 0;
  elements.accountModal.classList.remove("hidden");
  elements.accountModal.setAttribute("aria-hidden", "false");
  elements.accountNameInput.focus();
}

function closeAccountModal() {
  editingAccountId = null;
  elements.accountModal.classList.add("hidden");
  elements.accountModal.setAttribute("aria-hidden", "true");
}

function saveAccountFromForm(event) {
  event.preventDefault();
  const existing = editingAccountId ? state.accounts.find((account) => account.id === editingAccountId) : null;
  const account = {
    id: existing?.id || createId(),
    title: elements.accountNameInput.value.trim() || "Новый счёт",
    icon: elements.accountIconInput.value.trim() || "💳",
    color: elements.accountColorInput.value || "#57be7a",
    groupId: elements.accountGroupInput.value || "",
    initialBalance: Number(elements.accountBalanceInput.value || 0),
    order: existing?.order || state.accounts.length + 1,
  };

  if (existing) {
    Object.assign(existing, account);
  } else {
    state.accounts.push(account);
    selectedAccountId = account.id;
  }
  saveState();
  renderStaticControls();
  render();
  closeAccountModal();
  showToast(existing ? "Счёт обновлён" : "Счёт создан");
}

function openAccountGroupModal(group = null) {
  editingAccountGroupId = group?.id || null;
  elements.accountGroupModalTitle.textContent = group ? "Редактировать группу счетов" : "Новая группа счетов";
  elements.accountGroupSubmitButton.textContent = group ? "Сохранить группу" : "Создать группу";
  elements.accountGroupNameInput.value = group?.title || "";
  elements.accountGroupIconInput.value = group?.icon || "📁";
  elements.accountGroupColorInput.value = group?.color || "#8f6ee8";
  elements.deleteAccountGroupAction?.classList.toggle("hidden", !group);
  elements.accountGroupModal.classList.remove("hidden");
  elements.accountGroupModal.setAttribute("aria-hidden", "false");
  elements.accountGroupNameInput.focus();
}

function closeAccountGroupModal() {
  editingAccountGroupId = null;
  elements.accountGroupModal.classList.add("hidden");
  elements.accountGroupModal.setAttribute("aria-hidden", "true");
}

function saveAccountGroupFromForm(event) {
  event.preventDefault();
  const existing = editingAccountGroupId
    ? state.accountGroups.find((group) => group.id === editingAccountGroupId)
    : null;
  const group = {
    id: existing?.id || createId(),
    title: elements.accountGroupNameInput.value.trim() || "Новая группа",
    icon: elements.accountGroupIconInput.value.trim() || "📁",
    color: elements.accountGroupColorInput.value || "#8f6ee8",
    order: existing?.order || state.accountGroups.length + 1,
  };

  if (existing) {
    Object.assign(existing, group);
  } else {
    state.accountGroups.push(group);
    selectedAccountId = `group:${group.id}`;
  }
  saveState();
  render();
  closeAccountGroupModal();
  showToast(existing ? "Группа обновлена" : "Группа создана");
}

function deleteAccountGroup(id) {
  const group = state.accountGroups.find((item) => item.id === id);
  if (!group) return;
  if (!confirm(`Удалить только группу «${group.title}»? Счета останутся на месте.`)) return;

  state.accountGroups = state.accountGroups.filter((item) => item.id !== id);
  state.accounts = state.accounts.map((account) => (
    account.groupId === id ? { ...account, groupId: "" } : account
  ));
  collapsedAccountGroups.delete(id);
  if (selectedAccountId === `group:${id}`) selectedAccountId = "all";

  saveState();
  renderStaticControls();
  render();
  closeAccountGroupModal();
  showToast("Группа удалена, счета сохранены");
}

function shiftMonth(delta) {
  const current = elements.monthSelect.value || getCurrentMonthKey();
  const [year, month] = current.split("-").map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  const next = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  if (![...elements.monthSelect.options].some((option) => option.value === next)) {
    const option = document.createElement("option");
    option.value = next;
    option.textContent = formatMonth(next);
    elements.monthSelect.append(option);
  }
  elements.monthSelect.value = next;
  renderMonthTabs(next);
  render();
}

function renderMonthTabs(selected) {
  const [year] = selected.split("-").map(Number);
  const tabs = Array.from({ length: 12 }, (_, index) => {
    const key = `${year}-${String(index + 1).padStart(2, "0")}`;
    const label = new Date(year, index, 1).toLocaleDateString("ru-RU", { month: "long" });
    const isActive = key === selected;
    return `
      <button class="month-tab ${isActive ? "active" : ""}" type="button" data-month="${key}" aria-pressed="${isActive}">
        ${capitalizeFirst(label)}
      </button>
    `;
  }).join("");

  elements.monthTabs.innerHTML = `
    <span class="period-chip">Период ›</span>
    ${tabs}
  `;

  requestAnimationFrame(() => {
    elements.monthTabs
      .querySelector(`[data-month="${selected}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  });
}

function handleMonthTabClick(event) {
  const target = event.target.closest("[data-month]");
  if (!target) return;
  const month = target.dataset.month;
  if (![...elements.monthSelect.options].some((option) => option.value === month)) {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = formatMonth(month);
    elements.monthSelect.append(option);
  }
  elements.monthSelect.value = month;
  render();
}

function matchesSelectedAccount(op) {
  if (selectedAccountId === "all") return true;
  if (selectedAccountId.startsWith("group:")) {
    const groupId = selectedAccountId.replace("group:", "");
    const accountIds = state.accounts
      .filter((account) => account.groupId === groupId)
      .map((account) => account.id);
    return accountIds.includes(op.accountId)
      || accountIds.includes(op.fromAccountId)
      || accountIds.includes(op.toAccountId);
  }
  return op.accountId === selectedAccountId || op.fromAccountId === selectedAccountId || op.toAccountId === selectedAccountId;
}

function getSelectedAccountLabel() {
  if (selectedAccountId === "all") return "Все счета";

  if (selectedAccountId.startsWith("group:")) {
    const groupId = selectedAccountId.replace("group:", "");
    const group = state.accountGroups.find((item) => item.id === groupId);
    return group ? `${group.icon || "📁"} ${group.title}` : "Группа счетов";
  }

  const account = getAccount(selectedAccountId);
  return account ? `${account.icon || ""} ${account.title}`.trim() : "Счёт";
}

function exportState() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `finance-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Экспорт подготовлен");
}

function importStateFromPrompt() {
  const raw = prompt("Вставь JSON экспорта");
  if (!raw) return;
  try {
    state = normalizeState(JSON.parse(raw));
    selectedAccountId = "all";
    saveState();
    renderStaticControls();
    renderMonthOptions();
    render();
    showToast("Данные импортированы");
  } catch {
    showToast("Не удалось импортировать JSON");
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2200);
}

function resetDemoData() {
  state = structuredClone(demoState);
  saveState();
  renderStaticControls();
  renderMonthOptions();
  elements.monthSelect.value = "2026-04";
  render();
}

function handlePlanChartMove(event) {
  if (!lastPlanContext) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 720;
  const day = xToDay(lastPlanContext.month, x);

  if (planHover.month === lastPlanContext.month && planHover.day === day) return;

  planHover = { month: lastPlanContext.month, day };
  updatePlan(lastPlanContext);
}

function clearPlanChartHover() {
  if (!lastPlanContext || !planHover.day) return;
  planHover = { month: lastPlanContext.month, day: null };
  updatePlan(lastPlanContext);
}

function buildPlanChart(month, monthOperations, selectedDay, options = {}) {
  const compact = Boolean(options.compact);
  const days = daysInMonth(month);
  const boundaryDay = getFactBoundaryDay(month);
  const pastOperations = monthOperations.filter((op) => getOperationDay(op) <= Math.max(boundaryDay, 0));
  const futureOperations = monthOperations.filter((op) => getOperationDay(op) > boundaryDay);
  const factIncomePoints = cumulativePoints(month, days, pastOperations, "income").filter((point) => point.day <= Math.max(boundaryDay, 1));
  const factExpensePoints = cumulativePoints(month, days, pastOperations, "expense").filter((point) => point.day <= Math.max(boundaryDay, 1));
  const shouldShowPlanContinuation = boundaryDay < days;
  const planIncomePoints = shouldShowPlanContinuation
    ? plannedContinuationPoints(month, days, pastOperations, futureOperations, "income", boundaryDay)
    : [];
  const planExpensePoints = shouldShowPlanContinuation
    ? plannedContinuationPoints(month, days, pastOperations, futureOperations, "expense", boundaryDay)
    : [];
  const selected = buildSelectedDayMarker(month, monthOperations, selectedDay, boundaryDay);
  const maxValue = Math.max(
    1000,
    ...factIncomePoints.map((p) => p.value),
    ...factExpensePoints.map((p) => p.value),
    ...planIncomePoints.map((p) => p.value),
    ...planExpensePoints.map((p) => p.value),
  );

  const chart = compact
    ? { left: 78, right: 690, top: 40, bottom: 190 }
    : { left: 78, right: 690, top: 42, bottom: 176 };

  const pointToCoord = (point) => {
    const x = chart.left + ((point.day - 1) / (days - 1 || 1)) * (chart.right - chart.left);
    const y = chart.bottom - (point.value / maxValue) * (chart.bottom - chart.top);
    return { x: round(x), y: round(y) };
  };

  const factIncomePath = buildRoundedCornerPath(factIncomePoints, pointToCoord);
  const planIncomePath = buildRoundedCornerPath(planIncomePoints, pointToCoord);
  const factExpenseSegments = buildExpenseCategorySegments({
    month,
    operations: pastOperations,
    points: factExpensePoints,
    pointToCoord,
    strokeWidth: 3,
    fallbackColor: "#4d535f",
  });
  const planExpenseSegments = buildExpenseCategorySegments({
    month,
    operations: futureOperations,
    points: planExpensePoints,
    pointToCoord,
    strokeWidth: 2.4,
    fallbackColor: "#2d8ccc",
    dashed: true,
  });
  const shortage = findShortageStart(planIncomePoints, planExpensePoints);
  const shortagePath = shortage
    ? buildRoundedCornerPath(planExpensePoints.filter((point) => point.day >= shortage), pointToCoord)
    : "";

  const selectedX = dayToX(selectedDay, days, chart);
  const selectedIncomeY = chart.bottom - (selected.incomeValue / maxValue) * (chart.bottom - chart.top);
  const selectedExpenseY = chart.bottom - (selected.expenseValue / maxValue) * (chart.bottom - chart.top);
  const selectedExpenseColor = getDominantExpenseCategoryColor(monthOperations, `${month}-${String(selectedDay).padStart(2, "0")}`) || "#565963";
  const pillWidth = 92;
  const pillHeight = 28;
  const pillY = 2;
  const pillX = clamp(selectedX - pillWidth / 2, 8, 720 - pillWidth - 8);
  const hideEndDateLabel = compact || pillX + pillWidth > chart.right - 64;
  const labels = compact
    ? ""
    : Array.from({ length: days }, (_, index) => {
      const day = index + 1;
      const x = dayToX(day, days, chart);
      if (day !== 1 && day !== days && day % 5 !== 0 && day !== selectedDay) return "";
      return `<text x="${round(x)}" y="209" text-anchor="middle" fill="#9a9892" font-size="15">${day}</text>`;
    }).join("");
  const yGrid = Array.from({ length: 5 }, (_, index) => {
    const value = Math.round(maxValue * ((4 - index) / 4));
    const y = chart.bottom - (value / maxValue) * (chart.bottom - chart.top);
    const label = value === 0 ? "0" : formatChartMoney(value);
    return `
      <line x1="${chart.left}" y1="${round(y)}" x2="${chart.right}" y2="${round(y)}" stroke="#eceff3" stroke-width="1"/>
      <text x="${chart.left - 12}" y="${round(y + 5)}" text-anchor="end" fill="#9aa3b2" font-size="15">${label}</text>
    `;
  }).join("");

  return `
    ${yGrid}
    ${factIncomePath ? `<path d="${factIncomePath}" fill="none" stroke="#62bf7b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
    ${factExpenseSegments}
    ${planIncomePath ? `<path d="${planIncomePath}" fill="none" stroke="#62bf7b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 8"/>` : ""}
    ${planExpenseSegments}
    ${shortagePath ? `<path d="${shortagePath}" fill="none" stroke="#e35d5b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.16"/>` : ""}
    <line x1="${round(selectedX)}" y1="34" x2="${round(selectedX)}" y2="${chart.bottom}" stroke="#5d6066" stroke-width="1" stroke-dasharray="3 6" opacity="0.62"/>
    <rect x="${round(pillX)}" y="${pillY}" width="${pillWidth}" height="${pillHeight}" rx="12" fill="#4d4e55"/>
    <text x="${round(pillX + pillWidth / 2)}" y="21" text-anchor="middle" fill="#fff" font-size="16" font-weight="560">${selectedDay} ${monthNameShort(month)}</text>
    <circle cx="${round(selectedX)}" cy="${round(selectedIncomeY)}" r="4.5" fill="#57be7a" stroke="#fff" stroke-width="2"/>
    <circle cx="${round(selectedX)}" cy="${round(selectedExpenseY)}" r="4.5" fill="${escapeHtml(selectedExpenseColor)}" stroke="#fff" stroke-width="2"/>
    ${labels}
    ${hideEndDateLabel ? "" : `<text x="${chart.right}" y="32" text-anchor="end" fill="#9aa3b2" font-size="15">${days} ${monthNameShort(month)}</text>`}
    <rect x="${chart.left}" y="${chart.top}" width="${chart.right - chart.left}" height="${chart.bottom - chart.top}" fill="transparent"/>
  `;
}

function buildExpenseCategorySegments({ month, operations, points, pointToCoord, strokeWidth, fallbackColor, dashed = false }) {
  if (points.length < 2) return "";

  return points
    .slice(1)
    .map((point, index) => {
      const previous = points[index];
      const path = buildRoundedSegmentPath(points, index, pointToCoord);
      const dayKey = `${month}-${String(point.day).padStart(2, "0")}`;
      const color = getDominantExpenseCategoryColor(operations, dayKey);
      const hasGrowth = point.value > previous.value;
      const stroke = hasGrowth && color ? color : fallbackColor;
      const opacity = hasGrowth ? 0.92 : point.value > 0 ? 0.34 : 0.18;
      const dash = dashed ? ` stroke-dasharray="5 8"` : "";

      return `<path d="${path}" fill="none" stroke="${escapeHtml(stroke)}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"${dash}/>`;
    })
    .join("");
}

function buildRoundedCornerPath(points, pointToCoord) {
  if (!points.length) return "";
  if (points.length === 1) {
    const { x, y } = pointToCoord(points[0]);
    return `M ${x} ${y}`;
  }

  const coords = points.map(pointToCoord);
  const commands = [`M ${coords[0].x} ${coords[0].y}`];

  for (let index = 1; index < coords.length - 1; index += 1) {
    const corner = buildRoundedCorner(coords[index - 1], coords[index], coords[index + 1]);
    if (!corner) {
      commands.push(`L ${coords[index].x} ${coords[index].y}`);
      continue;
    }

    commands.push(`L ${corner.before.x} ${corner.before.y}`);
    commands.push(`Q ${coords[index].x} ${coords[index].y}, ${corner.after.x} ${corner.after.y}`);
  }

  const last = coords[coords.length - 1];
  commands.push(`L ${last.x} ${last.y}`);

  return commands.join(" ");
}

function buildRoundedSegmentPath(points, index, pointToCoord) {
  const coords = points.map(pointToCoord);
  const previous = coords[index];
  const current = coords[index + 1];
  if (!previous || !current) return "";

  const previousCorner = index > 0 ? buildRoundedCorner(coords[index - 1], previous, current) : null;
  const currentCorner = index < coords.length - 2 ? buildRoundedCorner(previous, current, coords[index + 2]) : null;
  const start = previousCorner?.after || previous;
  const end = currentCorner?.before || current;
  const commands = [`M ${start.x} ${start.y}`, `L ${end.x} ${end.y}`];

  if (currentCorner) {
    commands.push(`Q ${current.x} ${current.y}, ${currentCorner.after.x} ${currentCorner.after.y}`);
  }

  return commands.join(" ");
}

function buildRoundedCorner(previous, current, next) {
  const incoming = distance(previous, current);
  const outgoing = distance(current, next);
  const cross = (current.x - previous.x) * (next.y - current.y) - (current.y - previous.y) * (next.x - current.x);
  if (incoming < 2 || outgoing < 2 || Math.abs(cross) < 0.8) return null;

  const radius = Math.min(7, incoming * 0.42, outgoing * 0.42);

  return {
    before: pointBetween(current, previous, radius),
    after: pointBetween(current, next, radius),
  };
}

function pointBetween(from, to, distanceFromStart) {
  const length = distance(from, to);
  if (!length) return { x: from.x, y: from.y };
  const ratio = clamp(distanceFromStart / length, 0, 1);

  return {
    x: round(from.x + (to.x - from.x) * ratio),
    y: round(from.y + (to.y - from.y) * ratio),
  };
}

function distance(from, to) {
  return Math.hypot(to.x - from.x, to.y - from.y);
}

function getDominantExpenseCategoryColor(operations, dayKey) {
  const categoryTotals = new Map();
  operations
    .filter((op) => op.type === "expense" && op.date === dayKey)
    .forEach((op) => {
      const current = categoryTotals.get(op.categoryId) || 0;
      categoryTotals.set(op.categoryId, current + Number(op.amount || 0));
    });

  const [categoryId] = Array.from(categoryTotals.entries())
    .sort((left, right) => right[1] - left[1])[0] || [];
  const category = getCategory(categoryId);

  return category?.color || null;
}

function cumulativePoints(month, days, source, type) {
  const points = [];
  let total = 0;

  for (let day = 1; day <= days; day += 1) {
    const dayKey = `${month}-${String(day).padStart(2, "0")}`;
    total += source
      .filter((op) => op.type === type && op.date === dayKey)
      .reduce((acc, op) => acc + op.amount, 0);
    points.push({ day, value: total });
  }

  return points;
}

function plannedContinuationPoints(month, days, facts, futurePlans, type, boundaryDay) {
  const startDay = Math.max(boundaryDay, 1);
  const startKey = `${month}-${String(startDay).padStart(2, "0")}`;
  const startValue = facts.filter((op) => op.type === type).reduce((acc, op) => acc + op.amount, 0);
  const points = [];
  let total = startValue;

  if (startDay > boundaryDay) {
    total += futurePlans
      .filter((op) => op.type === type && op.date === startKey)
      .reduce((acc, op) => acc + op.amount, 0);
  }

  points.push({ day: startDay, value: total });

  for (let day = startDay + 1; day <= days; day += 1) {
    const dayKey = `${month}-${String(day).padStart(2, "0")}`;
    total += futurePlans
      .filter((op) => op.type === type && op.date === dayKey)
      .reduce((acc, op) => acc + op.amount, 0);
    points.push({ day, value: total });
  }

  return points;
}

function buildPlanDayTotals(summary) {
  return `
    <div>
      <span>Поступления</span>
      <strong class="income-text">${formatMoney(summary.cumulativeIncome)}</strong>
    </div>
    <div>
      <span>Расходы</span>
      <strong>${formatMoney(summary.cumulativeExpense)}</strong>
    </div>
  `;
}

function buildPlanBalanceRow(month, day, summary, options = {}) {
  const compact = Boolean(options.compact);
  const balanceClass = summary.balance >= 0 ? "" : "expense-text";
  const dayBalance = summary.factIncome + summary.planIncome - summary.factExpense - summary.planExpense;
  const dayBalanceClass = dayBalance >= 0 ? "income-text" : "expense-text";
  const balanceLabel = compact
    ? `Баланс ${day} ${monthNameShort(month)}`
    : `Баланс на ${day} ${monthNameShort(month)}`;
  const dayLabel = compact ? "День" : "За день";

  if (compact) {
    return `
      <div class="balance-dot" aria-hidden="true"></div>
      <div class="plan-balance-main">
        <span>${balanceLabel}</span>
        <strong class="${balanceClass}">${formatMoney(summary.balance)}</strong>
      </div>
    `;
  }

  return `
    <div class="balance-dot" aria-hidden="true"></div>
    <div class="plan-balance-main">
      <span>${balanceLabel}</span>
      <strong class="${balanceClass}">${formatMoney(summary.balance)}</strong>
    </div>
    <div class="plan-day-total">
      <span>${dayLabel}</span>
      <strong class="${dayBalanceClass}">${formatSignedMoney(dayBalance)}</strong>
    </div>
  `;
}

function computeDaySummary(month, monthOperations, day) {
  const dayKey = `${month}-${String(day).padStart(2, "0")}`;
  const boundaryDay = getFactBoundaryDay(month);
  const factToDay = monthOperations.filter((op) => getOperationDay(op) <= Math.min(day, Math.max(boundaryDay, 0)));
  const planToDay = monthOperations.filter((op) => getOperationDay(op) > boundaryDay && getOperationDay(op) <= day);
  const dayOperations = monthOperations.filter((op) => op.date === dayKey);
  const factDay = dayOperations.filter((op) => op.status === "fact");
  const planDay = dayOperations.filter((op) => op.status === "plan");

  const factIncome = sumBy(factDay, "income");
  const factExpense = sumBy(factDay, "expense");
  const planIncome = sumBy(planDay, "income");
  const planExpense = sumBy(planDay, "expense");
  const cumulativeIncome = sumBy(factToDay, "income") + sumBy(planToDay, "income");
  const cumulativeExpense = sumBy(factToDay, "expense") + sumBy(planToDay, "expense");
  const balance = cumulativeIncome - cumulativeExpense;

  return { factIncome, factExpense, planIncome, planExpense, cumulativeIncome, cumulativeExpense, balance };
}

function buildPlanDayOperations(month, monthOperations, day, options = {}) {
  const compact = Boolean(options.compact);
  const dayKey = `${month}-${String(day).padStart(2, "0")}`;
  const dayOperations = monthOperations.filter((op) => op.date === dayKey);
  const factOperations = dayOperations.filter((op) => op.status === "fact");
  const planOperations = dayOperations.filter((op) => op.status === "plan");

  if (!dayOperations.length) {
    return `
      <h3>${day > getFactBoundaryDay(month) ? "Планы" : "Совершенные"}</h3>
      <p class="plan-empty">На этот день операций нет.</p>
    `;
  }

  return `
    ${factOperations.length ? `<h3>Совершенные</h3><div class="plan-op-list">${factOperations.map((op) => renderPlanOperationItem(op, { compact })).join("")}</div>` : ""}
    ${planOperations.length ? `<h3>Планы</h3><div class="plan-op-list">${planOperations.map((op) => renderPlanOperationItem(op, { compact })).join("")}</div>` : ""}
  `;
}

function renderPlanOperationItem(op, options = {}) {
  const compact = Boolean(options.compact);
  const account = getAccount(op.accountId || op.fromAccountId);
  const toAccount = getAccount(op.toAccountId);
  const category = getCategory(op.categoryId);
  const isTransfer = op.type === "transfer";
  const title = isTransfer
    ? "Перевод"
    : `${category?.icon || ""} ${category?.title || "Без категории"}`.trim();
  const subtitle = isTransfer
    ? `${account?.title || "Счёт"} → ${toAccount?.title || "Счёт"}`
    : `${op.title || "Без описания"} · ${account?.title || "Счёт"}`;
  const amount = isTransfer ? formatMoney(op.amount) : `${op.type === "income" ? "+" : "-"}${formatMoney(op.amount)}`;
  const amountClass = op.type === "income" ? "income-text" : op.type === "expense" ? "" : "transfer-text";
  const icon = isTransfer ? "↔" : category?.icon || "•";
  const color = isTransfer ? "#2d8ccc" : category?.color || "#565963";

  if (compact) {
    const compactTitle = isTransfer
      ? "Перевод"
      : category?.title || "Без категории";

    return `
      <div class="plan-op-item compact-plan-op-item">
        <strong>${escapeHtml(compactTitle)}</strong>
        <em class="${amountClass}">${amount}</em>
      </div>
    `;
  }

  return `
    <div class="plan-op-item">
      <div class="plan-op-icon" style="--item-color:${color}">${icon}</div>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(subtitle)}</span>
      </div>
      <em class="${amountClass}">${amount}</em>
    </div>
  `;
}

function renderUpcomingPlanItem(op) {
  const account = getAccount(op.accountId || op.fromAccountId);
  const toAccount = getAccount(op.toAccountId);
  const category = getCategory(op.categoryId);
  const isTransfer = op.type === "transfer";
  const icon = isTransfer ? "↔" : category?.icon || "•";
  const title = isTransfer
    ? `${account?.title || "Счёт"} → ${toAccount?.title || "Счёт"}`
    : category?.title || "Без категории";
  const isOverdue = getOperationDay(op) <= getFactBoundaryDay(op.date.slice(0, 7));
  const subtitle = `${formatOperationDayLabel(op.date)} · ${isOverdue ? "ожидает решения" : op.title || account?.title || "План"}`;
  const amount = isTransfer ? formatMoney(op.amount) : `${op.type === "income" ? "+" : "-"}${formatMoney(op.amount)}`;
  const amountClass = op.type === "income" ? "income-text" : op.type === "expense" ? "expense-text" : "transfer-text";

  return `
    <div class="upcoming-item">
      <span class="upcoming-icon">${icon}</span>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(subtitle)}</span>
      </div>
      <em class="${amountClass}">${amount}</em>
    </div>
  `;
}

function buildSummaryTile(label, value, detail, tone = "") {
  return `
    <div class="summary-tile ${tone}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <em>${escapeHtml(detail)}</em>
    </div>
  `;
}

function buildSelectedDayMarker(month, monthOperations, day, boundaryDay) {
  const factToBoundary = monthOperations.filter((op) => getOperationDay(op) <= Math.max(boundaryDay, 0));
  const futurePlansToDay = monthOperations.filter((op) => getOperationDay(op) > boundaryDay && getOperationDay(op) <= day);
  const factToSelected = monthOperations.filter((op) => getOperationDay(op) <= Math.min(day, Math.max(boundaryDay, 0)));
  const isFuture = day > boundaryDay;
  const incomeValue = isFuture
    ? sumBy(factToBoundary, "income") + sumBy(futurePlansToDay, "income")
    : sumBy(factToSelected, "income");
  const expenseValue = isFuture
    ? sumBy(factToBoundary, "expense") + sumBy(futurePlansToDay, "expense")
    : sumBy(factToSelected, "expense");

  return { incomeValue, expenseValue };
}

function findShortageStart(incomePoints, expensePoints) {
  const incomeMap = new Map(incomePoints.map((point) => [point.day, point.value]));
  const fallbackIncome = incomePoints.at(-1)?.value || 0;
  const shortage = expensePoints.find((point) => point.value > (incomeMap.get(point.day) ?? fallbackIncome));
  return shortage?.day || null;
}

function groupExpensesByCategory(source) {
  const map = new Map();
  source
    .filter((op) => op.type === "expense")
    .forEach((op) => {
      const category = getCategory(op.categoryId);
      const key = op.categoryId || "uncategorized";
      const current = map.get(key) || {
        id: key,
        title: category?.title || "Без категории",
        icon: category?.icon || "•",
        color: category?.color || "#565963",
        amount: 0,
      };
      current.amount += op.amount;
      map.set(key, current);
    });

  return Array.from(map.values()).sort((a, b) => b.amount - a.amount);
}

function calculateAccountBalances() {
  const balances = new Map(state.accounts.map((account) => [account.id, Number(account.initialBalance || 0)]));

  state.operations
    .filter((op) => op.status === "fact")
    .forEach((op) => {
      if (op.type === "income") balances.set(op.accountId, (balances.get(op.accountId) || 0) + op.amount);
      if (op.type === "expense") balances.set(op.accountId, (balances.get(op.accountId) || 0) - op.amount);
      if (op.type === "transfer") {
        balances.set(op.fromAccountId, (balances.get(op.fromAccountId) || 0) - op.amount);
        balances.set(op.toAccountId, (balances.get(op.toAccountId) || 0) + op.amount);
      }
    });

  return balances;
}

function groupByDate(source) {
  const map = new Map();
  source.forEach((op) => {
    if (!map.has(op.date)) map.set(op.date, []);
    map.get(op.date).push(op);
  });
  return Array.from(map.entries());
}

function parseTags(value) {
  const names = value
    .split(",")
    .map((item) => item.trim().replace(/^#/, ""))
    .filter(Boolean);

  return names.map((name) => {
    const existing = state.tags.find((tag) => tag.title.toLowerCase() === name.toLowerCase());
    if (existing) return existing.id;

    const tag = {
      id: createId(),
      title: name,
      color: "#d8d1c3",
      order: state.tags.length + 1,
    };
    state.tags.push(tag);
    return tag.id;
  });
}

function sumBy(source, type) {
  return source.filter((op) => op.type === type).reduce((acc, op) => acc + Number(op.amount || 0), 0);
}

function orderedAccounts() {
  return [...state.accounts].sort((a, b) => a.order - b.order);
}

function orderedAccountGroups() {
  return [...(state.accountGroups || [])].sort((a, b) => a.order - b.order);
}

function orderedCategories() {
  return [...state.categories].sort((a, b) => a.order - b.order);
}

function getAccount(id) {
  return state.accounts.find((account) => account.id === id);
}

function getCategory(id) {
  return state.categories.find((category) => category.id === id);
}

function getTags(ids = []) {
  return ids.map((id) => state.tags.find((tag) => tag.id === id)).filter(Boolean);
}

function findCategoryByTitle(title, type) {
  if (!title) return null;
  return state?.categories?.find((category) => category.type === type && category.title === title)
    || demoState.categories.find((category) => category.type === type && category.title === title);
}

function defaultCategoryId(type) {
  return demoState.categories.find((category) => category.type === type)?.id || "";
}

function daysInMonth(month) {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex, 0).getDate();
}

function getFactBoundaryDay(month) {
  const currentMonth = getCurrentMonthKey();
  const days = daysInMonth(month);

  if (month < currentMonth) return days;
  if (month > currentMonth) return 0;

  return clamp(new Date().getDate(), 1, days);
}

function getOperationDay(op) {
  return Number(op.date.slice(-2));
}

function dayToX(day, days, chart) {
  return chart.left + ((day - 1) / (days - 1 || 1)) * (chart.right - chart.left);
}

function xToDay(month, x) {
  const days = daysInMonth(month);
  const chart = { left: 78, right: 690 };
  const percent = clamp((x - chart.left) / (chart.right - chart.left), 0, 1);
  return clamp(Math.round(1 + percent * (days - 1)), 1, days);
}

function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getPreviousMonthKey(month) {
  const [year, monthIndex] = month.split("-").map(Number);
  const date = new Date(year, monthIndex - 2, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMoney(value) {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function formatSignedMoney(value) {
  if (value === 0) return "0 ₽";
  return `${value > 0 ? "+" : "-"}${formatMoney(Math.abs(value))}`;
}

function formatMoneyComparison(current, previous) {
  const diff = current - previous;
  if (diff === 0) return "Как в прошлом месяце";
  if (previous === 0) return `К прошлому: ${formatSignedMoney(diff)}`;

  const percent = Math.round((Math.abs(diff) / previous) * 100);
  return `${diff > 0 ? "Больше" : "Меньше"} на ${percent}% (${formatSignedMoney(diff)})`;
}

function formatBalanceComparison(current, previous) {
  const diff = current - previous;
  return diff === 0 ? "Как в прошлом месяце" : `К прошлому: ${formatSignedMoney(diff)}`;
}

function formatCategoryComparison(current, previous) {
  const diff = current - previous;
  if (diff === 0) return "как в прошлом";
  if (previous === 0) return "новое";
  return `к прошлому ${formatSignedMoney(diff)}`;
}

function formatCompactMoney(value) {
  if (value >= 1000000) return `${round(value / 1000000)} млн`;
  if (value >= 1000) return `${Math.round(value / 1000)} тыс.`;
  return String(Math.round(value));
}

function formatPlainNumber(value) {
  return Math.round(value).toLocaleString("ru-RU");
}

function formatChartMoney(value) {
  if (value >= 1000) return `${Math.round(value / 1000)}k ₽`;
  return `${Math.round(value)} ₽`;
}

function formatMonth(month) {
  const [year, monthIndex] = month.split("-").map(Number);
  const date = new Date(year, monthIndex - 1, 1);
  return date.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
}

function monthNameShort(month) {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex - 1, 1).toLocaleDateString("ru-RU", { month: "short" }).replace(".", "");
}

function monthNamePrepositional(month) {
  const [, monthIndex] = month.split("-").map(Number);
  return [
    "январе",
    "феврале",
    "марте",
    "апреле",
    "мае",
    "июне",
    "июле",
    "августе",
    "сентябре",
    "октябре",
    "ноябре",
    "декабре",
  ][monthIndex - 1] || "месяце";
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function formatOperationDayLabel(value) {
  const today = new Date();
  const date = new Date(`${value}T00:00:00`);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (sameDate(date, today)) return "Сегодня";
  if (sameDate(date, yesterday)) return "Вчера";

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  }).replace(".", "");
}

function formatDaySummary(income, expense) {
  const parts = [];
  if (income > 0) parts.push(formatSignedMoney(income));
  if (expense > 0) parts.push(`-${formatMoney(expense)}`);
  return parts.length ? parts.join(" · ") : "0 ₽";
}

function sameDate(left, right) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function capitalizeFirst(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
