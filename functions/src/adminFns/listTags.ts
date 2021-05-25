/* eslint-disable no-unused-vars, spaced-comment,  */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

/**
 * listAllTags
 * Check if the Tag ID  provided is valid or not
 * If valid, Show if there's any public message associated to it.
 */
export async function listAllTags(
  data: any,
  context: any
): Promise<{ error: boolean; message: string; tagsData?: object; keysData?: object }> {
  functions.logger.log('listAllTags TEST2!')

  const uid = context.auth?.uid
  functions.logger.log(':::::listTags:v1:: ', uid)
  if (!uid) return { error: true, message: 'Unauthorised 1' }

  try {
    const usersRef = db.collection('users').doc(uid)
    const doc = await usersRef.get()
    if (!doc.exists) {
      return { error: true, message: 'Unauthorised 2' }
    }
    const userData = doc.data()
    if (!userData || userData.role !== 'admin') return { error: true, message: 'Unauthorised 3' }

    const tagsCollectionRef = db.collection('tags-test').orderBy('createdOn', 'desc')
    const tsnapshot = await tagsCollectionRef.get()
    const tagsData: any = []
    tsnapshot.forEach((tagDoc) => {
      tagsData.push({ ...tagDoc.data(), id: tagDoc.id })
    })

    const keysCollectionRef = db.collection('keys-test').orderBy('createdOn', 'desc')
    const ksnapshot = await keysCollectionRef.get()
    const keysData: any = []
    ksnapshot.forEach((keyDoc) => {
      keysData.push({ ...keyDoc.data(), id: keyDoc.id })
    })

    return { error: false, message: 'success', tagsData, keysData }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err }
  }
}
