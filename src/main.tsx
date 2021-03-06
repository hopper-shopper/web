import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import { version } from "../package.json"
import MaintenancePage from "pages/maintenance-page/MaintenancePage"

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.5,
    enabled: import.meta.env.PROD,
    environment: "production",
    release: version,
})

if (import.meta.env.VITE_MAINTENANCE === "true") {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <MaintenancePage />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById("root"),
    )
} else {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById("root"),
    )
}
