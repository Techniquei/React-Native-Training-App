import { TouchableOpacity } from "react-native"
import { CurrentTrainingsCard } from "./CurrentTrainingsCard"
import { Props } from "../../App"
import { Skeleton } from "@rneui/themed"

export function ExercisesList({
  ids,
  parent,
  navigation,
}: {
  ids: number[]
  parent: string
  navigation: Props["navigation"]
}) {
  return (
    <>
      {ids.map((id) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detailed", { id })}
          style={{ borderRadius: 10 }}
          key={id + parent}
        >
          <CurrentTrainingsCard id={id} />
        </TouchableOpacity>
      ))}
    </>
  )
}
