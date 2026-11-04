import { logoutAction } from "@/app/admin/login/actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-sm font-medium text-muted hover:text-ink transition-colors"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
