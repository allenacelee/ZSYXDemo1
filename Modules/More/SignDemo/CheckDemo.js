import React, {Componet}from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,

}from 'react-native';

export default class CheckBox extends React.Component{

    static defaultProps={
        checked:false,
    };
    
    
    constructor(props){
        super(props);
        this.state={
            selectCheckBox:'best',
        }
    };

     getImgSource(selectCheckBox){
        if (this.state.selectCheckBox===selectCheckBox)
            {return imgSource=require('./checked.png');}
        else { return imgSource=require('./uncheck.png');}
    }

    checkItem(title,selectCheckBox){
        return(
            <TouchableOpacity style={styles.checkBody} onPress={()=>this.setState({selectCheckBox:selectCheckBox})}>
                <Image style={styles.imgStyle} source={this.getImgSource(selectCheckBox)}/>
                <Text style={styles.textStyle}>{title}</Text>
            </TouchableOpacity>
        )
    }
    render(){
       
        return(

            <View style={styles.container}>
                
                {this.checkItem('非常满意','best')}
                {this.checkItem('满意','good')}
                {this.checkItem('一般','ok')}
                {this.checkItem('不满意','bad')}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'space-around',
    },
    checkBody:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-around',
    },
    textStyle:{
        marginTop:8,
        marginLeft:5,

    },
    imgStyle:{
        width:30,
        height:30,
    }
});