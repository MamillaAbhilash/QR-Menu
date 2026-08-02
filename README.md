# QR Menu Multi-Module System

A modern restaurant ordering experience with separate Admin, Waiter, and Customer views. The app includes:

- real-time cross-tab syncing through BroadcastChannel and localStorage
- table-based entry via URL parameters (e.g. `?table=3`) with a table selection simulator
- interactive menu browsing, filters, and customization
- live order tracking and waiter/bill service requests
- admin menu management and analytics
- a lightweight Express API for persisting restaurant state

## Run locally

- Frontend: npm run dev
- API server: npm run server

## Build

- npm run build
