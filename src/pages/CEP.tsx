import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

const CEP: React.FC = () => {
  const [CEP, setCEP] = React.useState("");
  const [error, setError] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [UF, setUF] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [complement, setComplement] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [DDD, setDDD] = React.useState("");

  async function autocomplete() {
    if (CEPValidator(String(CEP))) {
      const url = "https://viacep.com.br/ws/" + CEP + "/json/";

      try {
        await fetch(url, { mode: "cors" }).then((res) => {
          res.json().then((jsonResponse) => {
            if (jsonResponse.erro) {
              setError("Erro inesperado.");
            } else {
              setError("");
              setLocation(jsonResponse.localidade);
              setUF(jsonResponse.uf);
              setDistrict(jsonResponse.bairro);
              setStreet(jsonResponse.logradouro);
              setComplement(jsonResponse.complemento);
              setDDD(jsonResponse.ddd);
            }
          });
        });
      } catch (error) {
        setError("Erro inesperado.");
      }
    } else setError("CEP inválido");
  }

  const CEPValidator = (CEP: string): boolean => {
    const regex = /^[0-9]{8}$/;
    return true ? regex.test(CEP) : false;
  };

  return (
    <View>
      <Text style={styles.errorText}>{error}</Text>

      <Text>Informe um CEP para localizar!</Text>

      <TextInput
        style={styles.input}
        value={CEP}
        keyboardType="numeric"
        onChangeText={setCEP}
      />

      <Pressable style={styles.button} onPress={autocomplete}>
        <Text style={styles.btnText}>BUSCAR</Text>
      </Pressable>

      <Text></Text>
      <Text style={styles.resultInfos}>{location}</Text>
      <Text style={styles.resultInfos}>{UF}</Text>
      <Text style={styles.resultInfos}>{district}</Text>
      <Text style={styles.resultInfos}>{street}</Text>
      <Text style={styles.resultInfos}>{complement}</Text>
      <Text style={styles.resultInfos}>{DDD}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  resultInfos: {
    textAlign: "center",
  },
});

export default CEP;
