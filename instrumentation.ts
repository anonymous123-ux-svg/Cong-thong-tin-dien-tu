/**
 * ============================================================================
 *  LAB STABILITY SHIM — giữ tiến trình Node sống khi khai thác React2Shell
 * ============================================================================
 * Server Action `traCuuHoSo` (/tra-cuu) dính lỗ hổng giải mã React Flight
 * (CVE-2025-55182). Payload khai thác được runtime đã biên dịch của Next chạy
 * qua `new Function(...)`; NGAY SAU khi lệnh của attacker chạy xong, phần đuôi
 * của gadget thường ném lỗi (ví dụ `SyntaxError: Unexpected token ','`) NGAY
 * TRONG lúc deserialize — TRƯỚC khi code trong Server Action chạy.
 *
 * Vì lỗi bị ném ở tầng framework, nó nổi lên thành `uncaughtException` /
 * `unhandledRejection` và Node giết cả tiến trình server → cả web app sập
 * sau mỗi lần bắn payload (đúng như ảnh log).
 *
 * `register()` là hook khởi động chuẩn của Next 15 (chạy 1 lần lúc boot trong
 * Node.js runtime). Ở đây ta cài handler cấp-tiến-trình để NUỐT các lỗi không
 * bắt được: lệnh RCE VẪN chạy như thường, nhưng server không còn crash — thí
 * nghiệm giữ được phiên khai thác ổn định.
 * ============================================================================
 */
export async function register() {
  // Chỉ chạy trong Node.js runtime (bỏ qua Edge runtime).
  if (process.env.NEXT_RUNTIME !== "nodejs") return

  // Tránh gắn trùng handler khi module bị nạp lại (dev/HMR).
  const g = globalThis as typeof globalThis & { __labCrashGuard?: boolean }
  if (g.__labCrashGuard) return
  g.__labCrashGuard = true

  process.on("uncaughtException", (err) => {
    // Log để vẫn quan sát được exploit, nhưng KHÔNG cho tiến trình thoát.
    console.error("[lab] nuốt uncaughtException (giữ server sống):", err)
  })

  process.on("unhandledRejection", (reason) => {
    console.error("[lab] nuốt unhandledRejection (giữ server sống):", reason)
  })
}
