import {TouchableOpacity} from "react-native"
import { CurrentTrainingsCard } from "./CurrentTrainingsCard"
import { Props } from "../../App"

export function ExercisesList({ids, navigation} : {ids : number[], navigation:Props['navigation']}){
    return (
      <>
        {ids.map((id, index) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Detailed')} style={{borderRadius: 30}}>
              <CurrentTrainingsCard id={index + 1} key={index} />
            </TouchableOpacity>
          ))}
      </>
        
    )
}