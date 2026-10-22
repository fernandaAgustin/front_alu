
import {
    faGraduationCap,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

export default function LoginScreen() {
  const router = useRouter();

  const { login, loading, error } = useLogin();
  const { width } = useWindowDimensions();

  const isWideScreen = width >= 768;

  const handleLogin = async (
    email: string,
    password: string
  ) => {
    const success = await login(email, password);

    if (success) {
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3F6FC"
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isWideScreen && styles.scrollContentWide,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            isWideScreen && styles.cardWide,
          ]}
        >
          {/* Panel de bienvenida para tablet y web */}
          {isWideScreen && (
            <View style={styles.welcomePanel}>
              <View style={styles.decorationOne} />
              <View style={styles.decorationTwo} />

              <View style={styles.iconBox}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size={42}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.welcomeTitle}>
                Bienvenido de nuevo
              </Text>

              <Text style={styles.welcomeDescription}>
                Inicia sesión para acceder a tu cuenta
                y continuar con tus actividades.
              </Text>

              <View style={styles.divider} />

              <View style={styles.securityRow}>
                <FontAwesomeIcon
                  icon={faLock}
                  size={14}
                  color="#DCE5FF"
                />
                <Text style={styles.securityText}>
                  Acceso seguro a tu cuenta
                </Text>
              </View>
            </View>
          )}

          {/* Formulario existente */}
          <View
            style={[
              styles.formPanel,
              isWideScreen && styles.formPanelWide,
            ]}
          >
            {!isWideScreen && (
              <View style={styles.mobileIconBox}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size={32}
                  color="#FFFFFF"
                />
              </View>
            )}

            <View style={styles.heading}>
              <Text style={styles.eyebrow}>
                ACCESO A TU CUENTA
              </Text>

              <Text style={styles.title}>
                Iniciar sesión
              </Text>

              <Text style={styles.subtitle}>
                Ingresa tus credenciales para continuar.
              </Text>
            </View>

            <LoginForm
              onLogin={handleLogin}
              loading={loading}
              error={error}
            />

            <View style={styles.bottomDecoration} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FC",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },

  scrollContentWide: {
    paddingHorizontal: 36,
    paddingVertical: 40,
  },

  card: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E7ECF4",
    shadowColor: "#17294D",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 5,
  },

  cardWide: {
    flexDirection: "row",
    maxWidth: 1000,
    minHeight: 540,
  },

  welcomePanel: {
    flex: 0.9,
    backgroundColor: "#3157C8",
    paddingHorizontal: 36,
    paddingVertical: 42,
    justifyContent: "center",
    overflow: "hidden",
  },

  decorationOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#5275DD",
    opacity: 0.45,
    top: -80,
    right: -100,
  },

  decorationTwo: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#7690EA",
    opacity: 0.2,
    bottom: -90,
    left: -60,
  },

  iconBox: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  welcomeTitle: {
    fontSize: 29,
    lineHeight: 37,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 16,
  },

  welcomeDescription: {
    fontSize: 15,
    lineHeight: 25,
    color: "#E2E9FF",
  },

  divider: {
    width: 46,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginTop: 32,
    marginBottom: 20,
  },

  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  securityText: {
    fontSize: 12,
    color: "#DCE5FF",
  },

  formPanel: {
    width: "100%",
    padding: 26,
    justifyContent: "center",
  },

  formPanelWide: {
    flex: 1.1,
    paddingHorizontal: 42,
    paddingVertical: 38,
  },

  mobileIconBox: {
    width: 66,
    height: 66,
    borderRadius: 21,
    backgroundColor: "#3157C8",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 25,
  },

  heading: {
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "800",
    color: "#4263D8",
    marginBottom: 10,
  },

  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#202C43",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "#8791A5",
    marginTop: 9,
  },

  bottomDecoration: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#DCE4FA",
    alignSelf: "center",
    marginTop: 24,
  },
});
