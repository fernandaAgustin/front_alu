import { LoginFormProps } from "@/interfaces/auth.interface";
import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


export default function LoginForm({
    onLogin, 
    loading, 
    error 
}: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (text.trim() !== "") {
            setEmailError("");
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() !== "") {
            setPasswordError("");
        }
    };

    const handleLogin = () => {
        let valid = true;

        setEmailError("");
        setPasswordError("");

        if (email.trim() === "") {
            setEmailError("El email es obligatorio");
            valid = false;
        }

        if (password.trim() === "") {
            setPasswordError("La contraseña es obligatoria");
            valid = false;
        }

        if (!valid) {
            return;
        }

        onLogin(email, password);
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[
                            styles.input,
                            emailError !== "" ? styles.inputError : null
                        ]}
                        placeholder="tu@email.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={handleEmailChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />
                </View>

                {emailError !== "" && (
                    <Text style={styles.error}>{emailError}</Text>
                )}

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <View style={[
                        styles.passwordContainer,
                        passwordError !== "" ? styles.inputError : null
                    ]}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="••••••••"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.showButton}
                            disabled={loading}
                        >
                            <Ionicons 
                                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                                size={22} 
                                color="#999" 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {passwordError !== "" && (
                    <Text style={styles.error}>{passwordError}</Text>
                )}

                {error !== "" && (
                    <Text style={styles.error}>{error}</Text>
                )}

                <TouchableOpacity
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>
                        {loading ? "Validando..." : "Iniciar sesión"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: "#999",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: 24,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        color: "#1a1a1a",
        borderWidth: 1,
        borderColor: "transparent",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "transparent",
    },
    passwordInput: {
        flex: 1,
        padding: 14,
        fontSize: 15,
        color: "#1a1a1a",
    },
    showButton: {
        padding: 12,
    },
    inputError: {
        borderColor: "#dc2626",
        backgroundColor: "#fef2f2",
    },
    error: {
        color: "#dc2626",
        fontSize: 13,
        marginBottom: 8,
        marginTop: -12,
    },
    loginButton: {
        backgroundColor: "#1a1a1a",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    loginButtonDisabled: {
        opacity: 0.5,
    },
    loginButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "600",
    },
});
