# Finance Tracker MVP 2

Личный MVP для учёта доходов, расходов, переводов, планов и отчётов.

Проект пока простой: статический `HTML/CSS/JS`, данные хранятся в браузере через `localStorage`.

## Быстрый старт для Codex

В новом чате пиши:

```text
Продолжай проект finance-tracker-mvp-2. Прочитай только START.md.
```

Главное правило: `START.md` - короткий вход в проект. `HISTORY.md` читать только если реально нужен старый контекст.

## Файлы контекста

- `START.md` - актуальный короткий handoff.
- `AGENTS.md` - правила работы Codex в репозитории.
- `DECISIONS.md` - решения, которые не надо случайно откатывать.
- `TODO.md` - ближайшие задачи.
- `HISTORY.md` - длинный архив, не читать на старте.

## Как открыть локально

Можно открыть файл напрямую:

```text
file:///Users/andrejmladinov/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/%E2%9D%A4%EF%B8%8F%20%D0%9B%D0%B8%D1%87%D0%BD%D0%BE%D0%B5/%F0%9F%A4%96%20Codex/finance-tracker-mvp-2/index.html
```

Или запустить локальный сервер:

```bash
cd "/Users/andrejmladinov/Проекты/❤️ Личное/🤖 Codex/finance-tracker-mvp-2"
python3 -m http.server 8080
```

Потом открыть:

```text
http://localhost:8080
```

## Проверка

После правок JavaScript:

```bash
node --check app.js
```

После UI-правок открыть страницу в браузере и проверить console errors.

## Данные

Старый Supabase-проект и старые ключи не используются.

Пока MVP работает локально через `localStorage`. Supabase подключать отдельным этапом, когда локальный MVP станет стабильнее.
