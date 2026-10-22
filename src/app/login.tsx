
import {
  faArrowRight,
  faCircleExclamation,
  faEnvelope,
  faEye,
  faEyeSlash,
  faGraduationCap,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error, clearError } = useAuth();
  const router = useRouter();

  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, ingresa tu correo electrónico y contraseña."
      );
      return;
    }

    const success = await login({
      email: email.trim(),
      password,
    });

    if (success) {
      router.replace("/(tabs)");
    }
  };

  if (loading) {
    return (
      <Loading
        fullScreen
        message="Iniciando sesión..."
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
            styles.layout,
            isWideScreen && styles.layoutWide,
          ]}
        >
          {/* Panel visual */}
          {isWideScreen && (
            <View style={styles.sidePanel}>
              <View style={styles.decorCircleOne} />
              <View style={styles.decorCircleTwo} />

              <View style={styles.illustration}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size={48}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.sideTitle}>
                Bienvenido de nuevo
              </Text>

              <Text style={styles.sideDescription}>
                Accede a tu cuenta para continuar
                con tus actividades.
              </Text>

              <View style={styles.sideDivider} />

              <Text style={styles.sideFooter}>
                Un espacio para aprender y crecer.
              </Text>
            </View>
          )}

          {/* Formulario */}
          <View
            style={[
              styles.formPanel,
              isWideScreen && styles.formPanelWide,
            ]}
          >
            {!isWideScreen && (
              <View style={styles.mobileIllustration}>
                <View style={styles.mobileIconCircle}>
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    size={31}
                    color="#FFFFFF"
                  />
                </View>
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
                Ingresa tus datos para continuar.
              </Text>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  size={18}
                  color="#DC3545"
                />
                <Text style={styles.errorText}>
                  {error}
                </Text>
                <TouchableOpacity
                  onPress={clearError}
                  accessibilityLabel="Cerrar mensaje de error"
                >
                  <Text style={styles.errorClose}>×</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Correo electrónico
              </Text>

              <View style={styles.inputWrapper}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size={17}
                  color="#8994A8"
                />

                <TextInput
                  style={styles.input}
                  placeholder="nombre@correo.com"
                  placeholderTextColor="#A0A8B7"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (error) clearError();
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  editable={!loading}
                  accessibilityLabel="Correo electrónico"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Contraseña
                </Text>
              </View>

              <View style={styles.inputWrapper}>
                <FontAwesomeIcon
                  icon={faLock}
                  size={17}
                  color="#8994A8"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#A0A8B7"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    if (error) clearError();
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  textContentType="password"
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                  editable={!loading}
                  accessibilityLabel="Contraseña"
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowPassword((previous) => !previous)
                  }
                  style={styles.eyeButton}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    size={17}
                    color="#8994A8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.82}
              accessibilityRole="button"
            >
              <Text style={styles.loginButtonText}>
                Iniciar sesión
              </Text>

              <FontAwesomeIcon
                icon={faArrowRight}
                size={16}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No tienes una cuenta?
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/register")}
                activeOpacity={0.7}
              >
                <Text style={styles.registerLink}>
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomLine} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F6FC",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  scrollContentWide: {
    paddingHorizontal: 36,
    paddingVertical: 40,
  },
  layout: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E9EDF5",
    shadowColor: "#17294D",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 5,
  },
  layoutWide: {
    flexDirection: "row",
    maxWidth: 1000,
    minHeight: 570,
  },
  sidePanel: {
    flex: 0.9,
    backgroundColor: "#3157C8",
    paddingHorizontal: 35,
    paddingVertical: 45,
    justifyContent: "center",
    overflow: "hidden",
  },
  decorCircleOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#5275DD",
    opacity: 0.45,
    top: -90,
    right: -100,
  },
  decorCircleTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#6F8BEA",
    opacity: 0.2,
    bottom: -100,
    left: -70,
  },
  illustration: {
    width: 88,
    height: 88,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  sideTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
    marginBottom: 16,
  },
  sideDescription: {
    fontSize: 15,
    lineHeight: 25,
    color: "#E2E9FF",
  },
  sideDivider: {
    width: 48,
    height: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginTop: 35,
    marginBottom: 20,
  },
  sideFooter: {
    color: "#E2E9FF",
    fontSize: 13,
    lineHeight: 20,
  },
  formPanel: {
    width: "100%",
    padding: 27,
    justifyContent: "center",
  },
  formPanelWide: {
    flex: 1.1,
    paddingHorizontal: 48,
    paddingVertical: 42,
  },
  mobileIllustration: {
    alignItems: "center",
    marginBottom: 25,
  },
  mobileIconCircle: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: "#3157C8",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    marginBottom: 30,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "800",
    color: "#4263D8",
    marginBottom: 11,
  },
  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#202C43",
    letterSpacing: -0.7,
  },
  subtitle: {
    color: "#8791A5",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 9,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderRadius: 12,
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFD6D6",
    marginBottom: 20,
  },
  errorText: {
    color: "#B42332",
    fontSize: 13,
    flex: 1,
    lineHeight: 19,
  },
  errorClose: {
    fontSize: 23,
    color: "#B42332",
    paddingHorizontal: 3,
  },
  inputContainer: {
    marginBottom: 21,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#35415A",
    marginBottom: 9,
  },
  inputWrapper: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E6F0",
    backgroundColor: "#F9FAFD",
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 15,
    fontSize: 14,
    color: "#202C43",
    outlineStyle: "none",
  } as any,
  eyeButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    minHeight: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#3157C8",
    marginTop: 10,
    shadowColor: "#3157C8",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 26,
  },
  registerText: {
    fontSize: 13,
    color: "#8791A5",
  },
  registerLink: {
    fontSize: 13,
    fontWeight: "800",
    color: "#3157C8",
  },
  bottomLine: {
    height: 4,
    width: 42,
    borderRadius: 4,
    backgroundColor: "#DCE4FA",
    alignSelf: "center",
    marginTop: 30,
  },
});
