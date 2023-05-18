import { Button, Dialog } from "@rneui/themed"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { checkForLike, likeOnOff } from "../api"
import { getStoreUserId } from "../store"

export function DeatiledLikeButton({ exerciseId }: { exerciseId: number }) {
  console.log("button" + exerciseId)
  const [userIdState, setUserIdState] = useState(null)
  useEffect(() => {
    getStoreUserId().then((data) => setUserIdState(data))
  }, [])
  const queryClient = useQueryClient()
  const { data, isSuccess } = useQuery({
    queryFn: () => checkForLike(userIdState, exerciseId, data),
    onSuccess: () => console.log(data),
    queryKey: ["likeButton", userIdState],
  })

  const {mutate, isLoading} = useMutation({
    mutationFn: ()=>likeOnOff(userIdState, exerciseId, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["likeButton", "favorites"] })
      },
  })

  if (data!=undefined && isSuccess && !isLoading)
    return (
      <Button
        buttonStyle={{
          backgroundColor: data ? "red" : "grey",
          height: 62,
        }}
        title={data ? "Liked" : "Add to favorites"}
        icon={{ name: "heart", type: "ionicon", color: "white", size: 30 }}
        titleStyle={{ fontSize: 20, fontWeight: "700", letterSpacing: 2 }}
        onPress={()=>mutate()}
      />
    )
  return <Dialog.Loading />
}
