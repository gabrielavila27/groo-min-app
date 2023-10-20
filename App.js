import React, {useState} from 'react';
import { View, SafeAreaView, StatusBar, TouchableOpacity, Text, StyleSheet, TextInput, Image, Keyboard, ScrollView} from 'react-native';

import api from './src/Services/api'

export default function Tradutor() {

    const[txtTraduzir, setTxtTraduzir] = useState('');
    const[txtEncode, setTxtEncode] = useState()
    const[dados, setDados] = useState(null);
    const[choice, setChoice] = useState()
    const[img, setImg] = useState()

    function escolha(){
      if(choice == 'minion'){
        Keyboard.dismiss()
        setImg('https://1.bp.blogspot.com/-rx7n4YQgGds/VrYwdj2b7OI/AAAAAAAAArU/1l910P5fHF4/s1600/minions-03.png')
        minions()
      }else if(choice == 'groot'){
        Keyboard.dismiss()
        setImg('https://pngfre.com/wp-content/uploads/Groot-16-698x1024.png')
        groot()
      }else{
        alert('Você deve escolher uma das opções de tradução (Groot ou Minion).')
      }
    }

    function limpar(){
      setTxtTraduzir('');
      setTxtEncode('')
      setChoice('')
      setDados(null)
      setImg('')
    }

    async function minions(){
      if(txtTraduzir == ''){
        alert('Você deve inserir uma frase para traduzir.')
      } 
        try{
          const response = await api.get(`/minion.json?text=${txtEncode}`)
          console.log(response.data);
          setDados(response.data);

        } catch(error){
          setDados(null)
          console.log(error)
          alert('Erro ao tentar traduzir.')
        }
    }

    async function groot(){
      if(txtTraduzir == ''){
        alert('Você deve inserir uma frase para traduzir.')
      } 
        try{
          const response = await api.get(`/groot.json?text=${txtEncode}`)
          console.log(response.data);
          setDados(response.data);

        } catch(error){
          setDados(null)
          console.log(error)
          alert('Erro ao tentar traduzir.')
        }
    }



 return (
   <SafeAreaView style = {styles.container}>

    <StatusBar/>
    <Text style = {styles.title}>GrooMin Translator</Text>

    <TextInput value={txtTraduzir}  placeholder = 'Traduza uma frase aqui...' style = {styles.txtInput}
     onChangeText={(c) => (setTxtTraduzir(c), setTxtEncode(encodeURIComponent(c)))}></TextInput>
   
    <View style = {styles.viewBtn}>

    <TouchableOpacity onPress={() => setChoice('groot')}  style = {styles.btn}>

      <Text style = {styles.btnText}>Groot</Text>

    </TouchableOpacity>

    <TouchableOpacity onPress={() => setChoice('minion')} style = {styles.btn}>

      <Text style = {styles.btnText}>Minion</Text>

    </TouchableOpacity>

    <TouchableOpacity onPress={escolha} style = {styles.btn}>

      <Text style = {styles.btnText}>Translate</Text>

    </TouchableOpacity>

    <TouchableOpacity onPress={limpar}  style = {[styles.btn, {backgroundColor: '#F0664D'}]} >

      <Text style = {styles.btnText}>Delete</Text>

    </TouchableOpacity>

    </View >

    { dados &&
    <View style = {styles.viewRes}>
      <Text style = {styles.txtRes}>{dados.contents.translation? dados.contents.translation: ''}</Text>
      <Text style = {styles.txtRes}> {dados.contents.translated? `Tradução = ${dados.contents.translated}`: ''}</Text>
      <Image style = {styles.imgRes} source = {{uri: img}}/>
    </View>}
    
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#A150D9',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  title:{
    fontSize: 40,
    fontWeight: '700',
    marginVertical: '15%'
  },
  txtInput:{
    borderWidth: 1,
    width: '85%',
    height: 60,
    borderRadius: 10,
    marginBottom: '15%',
    paddingLeft: '3%',
    fontSize: 20,
    fontWeight: '500',
  },
  viewBtn:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 160,
    //borderWidth: 1,
    gap: 20,
    justifyContent: 'center',
  },
  btn:{
    width: '40%',
    height: 60,
    backgroundColor: '#5D8DFC',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  btnText:{
    fontSize: 20,
    fontWeight: '700'
  },
  viewRes:{
    marginVertical: '10%',
    alignItems: 'center',
    gap: 10
  },
  txtRes:{
    fontSize: 25,
    fontWeight: '700',
    color: '#121212'
  },
  imgRes:{
    resizeMode: 'contain',
    width: 150,
    height: 150,
  }
})