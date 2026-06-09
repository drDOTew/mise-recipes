"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

type Tab = "perfil" | "contraseña" | "plan";

export default function SettingsPage() {
  const { user, updateProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("perfil");
  const [name, setName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ name });
      alert("Cambios guardados");
    } catch {
      alert("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (newPassword.length < 8) {
      alert("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }
    setIsUpdatingPassword(true);
    try {
      await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      alert("Contraseña actualizada correctamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      alert("Error al actualizar la contraseña. Verificá que la contraseña actual sea correcta.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div>
      <Topbar title="Configuración" />

      <PageHeader title="Configuración" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["perfil", "contraseña", "plan"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === "perfil" && (
        <Card padding="lg" className="max-w-md">
          <h2 className="font-heading text-lg mb-4">Perfil</h2>
          <div className="space-y-4">
            <Input
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={user?.email || ""}
              disabled
              hint="No editable"
            />
            <Button onClick={handleSaveProfile} isLoading={isSaving}>
              Guardar cambios
            </Button>
          </div>
        </Card>
      )}

      {/* Password tab */}
      {activeTab === "contraseña" && (
        <Card padding="lg" className="max-w-md">
          <h2 className="font-heading text-lg mb-4">Cambiar contraseña</h2>
          <div className="space-y-4">
            <Input
              label="Contraseña actual"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="Nueva contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirmar nueva contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleUpdatePassword} isLoading={isUpdatingPassword}>
              Actualizar contraseña
            </Button>
          </div>
        </Card>
      )}

      {/* Plan tab */}
      {activeTab === "plan" && (
        <Card padding="lg" className="max-w-md">
          <h2 className="font-heading text-lg mb-4">Plan actual</h2>
          <div className="p-4 bg-accent-bg rounded-lg mb-4">
            <p className="font-heading text-xl capitalize">{user?.plan || "Free"}</p>
            <p className="text-sm text-text-secondary">
              {user?.plan === "chef" ? "Recetas ilimitadas" : "50 recetas máximo"}
            </p>
          </div>
          {user?.plan !== "chef" && (
            <Button variant="accent">Upgrade a Chef</Button>
          )}
          {user?.plan === "chef" && (
            <div className="text-sm text-text-secondary">
              <p className="font-medium mb-2">Incluye:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Recetas ilimitadas</li>
                <li>Colecciones</li>
                <li>Lista de compras</li>
                <li>Fotos</li>
                <li>Modo cocina</li>
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}