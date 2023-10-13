import * as React from 'react'
import * as RN from 'react-native'
import { database } from '../database/firebase'
import { doc } from 'firebase/firestore'

export default function Usuarios({
    id,
    email,
    name,
    phone,
    image // Supongamos que tienes la URL de la imagen en esta prop
}) {
    return (
        <RN.View>
            <RN.Image
                source={{ uri: image }} // Utiliza la URL de la imagen
                style={{ width: 100, height: 100 }} // Ajusta el tamaño de la imagen
            />
            <RN.Text>{email}</RN.Text>
            <RN.Text>{name}</RN.Text>
            <RN.Text>{phone}</RN.Text>
        </RN.View>
    )
}
