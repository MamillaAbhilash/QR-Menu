# TODO — Remove QR Scanner & QR Code Generator

## Steps

- [x] `AdminView.jsx`: remove QRGenerator + RoleQRScanner imports, scanner block, "Table QR Codes" tab, and `adminTab === 'qr'` render; update header text
- [x] `CustomerView.jsx`: remove RoleQRScanner import + JSX block
- [x] `WaiterView.jsx`: remove RoleQRScanner import + JSX block
- [x] Delete `src/components/common/RoleQRScanner.jsx`, `src/components/admin/QRGenerator.jsx`, `src/utils/qrcode.js`
- [x] `seedData.js`: remove `qrCodeUrl` field from `INITIAL_TABLES`
- [x] `package.json`: remove `@yudiel/react-qr-scanner` dependency
- [x] Verify with `npm run dev` / `npm run build`
