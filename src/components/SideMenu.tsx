
import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

import { SideMenuProps } from "../interfaces/menu.interface";
import { useAppSelector } from "../store/hooks";

export default function SideMenu({
  visible,
  onClose,
  onHome,
  onProfile,
  onSettings,
  onLogout,
}: SideMenuProps) {
  const user = useAppSelector((state) => state.auth.user);
  const { width } = useWindowDimensions();

  if (!visible) {
    return null;
  }

  const isSmallScreen = width < 600;
  const menuWidth = isSmallScreen
    ? Math.min(width * 0.84, 340)
    : Math.min(width * 0.34, 360);

  const displayName =
    user?.name ||
    (user?.nombre
      ? `${user.nombre} ${user.apellido ?? ""}`.trim()
      : "Usuario");

  const email = user?.email || "Sin correo registrado";
  const initial = displayName.charAt(0).toUpperCase();

  const renderOption = (
    title: string,
    subtitle: string,
    icon: keyof typeof Ionicons.glyphMap,
    onPress: () => void,
    active = false,
  ) => (
    <TouchableOpacity
      key={title}
      style={[styles.option, active && styles.activeOption]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
    >
      <View style={[styles.optionIcon, active && styles.activeOptionIcon]}>
        <Ionicons
          name={icon}
          size={21}
          color={active ? "#FFFFFF" : "#52627D"}
        />
      </View>

      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, active && styles.activeOptionTitle]}>
          {title}
        </Text>
        <Text
          style={[
            styles.optionSubtitle,
            active && styles.activeOptionSubtitle,
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={17}
        color={active ? "#FFFFFF" : "#A5AEC0"}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.overlay}>
      {/* Fondo oscuro: tocarlo cierra el menú */}
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
        accessibilityLabel="Cerrar menú"
      />

      {/* Panel lateral */}
      <View style={[styles.menu, { width: menuWidth }]}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="school-outline"
                size={25}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.headerTitle}>Mi espacio</Text>
              <Text style={styles.headerSubtitle}>Menú principal</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Cerrar menú"
            accessibilityRole="button"
          >
            <Ionicons name="close" size={22} color="#52627D" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Tarjeta de usuario */}
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.name} numberOfLines={1}>
                {displayName}
              </Text>

              <Text style={styles.email} numberOfLines={2}>
                {email}
              </Text>

              <View style={styles.roleBadge}>
                <Ionicons
                  name="person-circle-outline"
                  size={13}
                  color="#3157C8"
                />
                <Text style={styles.roleText}>Mi cuenta</Text>
              </View>
            </View>
          </View>

          {/* Opciones */}
          <Text style={styles.sectionTitle}>NAVEGACIÓN</Text>

          <View style={styles.optionsContainer}>
            {renderOption(
              "Inicio",
              "Pantalla principal",
              "home-outline",
              onHome,
              true,
            )}

            {renderOption(
              "Mi perfil",
              "Consulta tus datos",
              "person-outline",
              onProfile,
            )}

            {renderOption(
              "Configuración",
              "Preferencias y ajustes",
              "settings-outline",
              onSettings,
            )}
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={19}
                color="#3157C8"
              />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Tu cuenta</Text>
              <Text style={styles.tipText}>
                Mantén tus datos de acceso seguros.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Pie del menú */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <View style={styles.logoutIcon}>
              <Ionicons
                name="log-out-outline"
                size={21}
                color="#DC2626"
              />
            </View>

            <Text style={styles.logoutText}>Cerrar sesión</Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#DC2626"
            />
          </TouchableOpacity>

          <Text style={styles.footerCaption}>Sesión personal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    zIndex: 1000,
    elevation: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(20, 32, 55, 0.48)",
  },
  menu: {
    height: "100%",
    backgroundColor: "#F5F7FC",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
    elevation: 15,
    shadowColor: "#14213D",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 22,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF6",
  },
  headerBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  logoContainer: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#3157C8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#202C43",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#8791A5",
    marginTop: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F0F3F9",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7ECF5",
    borderRadius: 20,
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: "#3157C8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E8EDFF",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  onlineIndicator: {
    position: "absolute",
    width: 15,
    height: 15,
    right: -1,
    bottom: 0,
    borderRadius: 8,
    backgroundColor: "#22C55E",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: "800",
    color: "#202C43",
  },
  email: {
    fontSize: 11,
    color: "#8791A5",
    marginTop: 5,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
    backgroundColor: "#EDF2FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 8,
  },
  roleText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#3157C8",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
    color: "#99A3B5",
    marginTop: 30,
    marginBottom: 13,
    marginLeft: 5,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 68,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 16,
    gap: 11,
  },
  activeOption: {
    backgroundColor: "#3157C8",
    shadowColor: "#3157C8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  optionIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    backgroundColor: "#E9EEF8",
    alignItems: "center",
    justifyContent: "center",
  },
  activeOptionIcon: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  optionContent: {
    flex: 1,
    minWidth: 0,
  },
  optionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#263653",
  },
  activeOptionTitle: {
    color: "#FFFFFF",
  },
  optionSubtitle: {
    fontSize: 10,
    color: "#929DB0",
    marginTop: 4,
  },
  activeOptionSubtitle: {
    color: "#DCE5FF",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF0FF",
    borderRadius: 16,
    padding: 13,
    marginTop: 25,
    gap: 11,
  },
  tipIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#263653",
  },
  tipText: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 15,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },
  footerDivider: {
    height: 1,
    backgroundColor: "#E9EDF5",
    marginBottom: 14,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#FFF1F2",
    borderWidth: 1,
    borderColor: "#FFE1E4",
  },
  logoutIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#DC2626",
  },
  footerCaption: {
    fontSize: 10,
    color: "#A0A8B8",
    textAlign: "center",
    marginTop: 13,
  },
});
