import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
interface CustomHeaderProps {
}

const dailytasks = ["Поспати", "Поїсти", " Знову поїсти", "Поспати"];

const CustomHeader: React.FC<CustomHeaderProps> = () => {
  return (
    <View style={styles.header}>
      <View ><Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      /></View>
      <View style={styles.button} >
        <View style={styles.buttonLeftPart} >
          {dailytasks.slice(0, 4).map((task, i) => (
            <View style={styles.taskItem} key={i}>
              <View style={styles.bulletPoint}></View>
              <AutoSizeText
                style={styles.buttonText}
                fontSizePresets={[12,11,10,8]}
                numberOfLines={1}
                mode={ResizeTextMode.preset_font_sizes}>
                {task}
              </AutoSizeText>
            </View>
          ))}
        </View>

        <View style={styles.threeDotsCont}>
          <View style={styles.dots} ></View>
          <View style={styles.dots} ></View>
          <View style={styles.dots} ></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  threeDotsCont:{
    height:"90%",
    width:"10%"
  },
  dots:{
    marginTop:5,
    borderRadius: 50,
    height: 12,
    width: 12,
    backgroundColor: "#C2C2C2",
  },
  logo: {
    marginTop: 35,
    width: 80 * 1.2,
    height: 55 * 1.2,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 2,
    paddingBottom: 5,
    backgroundColor: '#1E1E1E',
  },
  buttonLeftPart: {
    backgroundColor: '#2E2E2E',
    width: "80%",
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  button: {
    backgroundColor: '#2E2E2E',
    borderBottomLeftRadius: 20,
    padding: 10,
    paddingTop: "10%",
    width: "70%",
    flexDirection: 'row',
    justifyContent:"space-around",
    flexWrap: "wrap"
  },
  taskItem: {
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5
  },
  bulletPoint: {
    borderRadius: 50,
    height: 10,
    width: 10,
    backgroundColor: "#C2C2C2",
    marginRight: 5
  },
  buttonText: {
    color: '#C2C2C2',
    fontSize: 12,
    width:"90%"
  },
});

export default CustomHeader;



function mapValue(value:number, inMin:number, inMax:number, outMin:number, outMax:number):number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}