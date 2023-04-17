import {TouchableOpacity} from "react-native"
import { CurrentTrainingsCard } from "./CurrentTrainingsCard"
import { Props } from "../../App"

export function ExercisesList({ids, parent, navigation} : {ids : number[], parent: string, navigation:Props['navigation']}){
    return (
      <>
        {ids.map((id, index) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Detailed')} style={{borderRadius: 30}} key={id+parent}>
              <CurrentTrainingsCard id={index + 1} />
            </TouchableOpacity>
          ))}
      </>
        
    )
}