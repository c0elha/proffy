import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7'
  },

  teacherList: {
    marginTop: -40,
  },

  containerEmpty: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    paddingTop: 15,
    paddingBottom: 15,
  },

  textEmpty:{
    marginLeft: 15,
    marginRight: 15,
    textAlign: "center",
    color: '#c1bccc',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  }
});

export default styles;