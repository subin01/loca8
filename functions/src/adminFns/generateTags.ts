/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { TAG_STATUS_UNREGISTERED } from '../global_constants'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

function getTagPattern(series: number, sequence: number) {
  return `${series}-${sequence}`
}
function generateActivationKey() {
  return `${Math.floor(Math.random() * 10000) + 1000}-${Math.floor(Math.random() * 10000) + 1000}`
}

/**
 * activateTag
 * Check if the Tag ID & Activation key provided is valid or not
 * If valid, removes the key from the pool.
 * @param tid
 * @param key
 * @param uid
 */
export async function generateTags(
  data: any,
  context: any
): Promise<{ error: boolean; message: string; errorField?: string }> {
  try {
    const series = parseInt(data?.series)
    const start = parseInt(data?.start)
    const count = parseInt(data?.count)
    const type = parseInt(data?.type) || 'default'
    const uid = context.auth?.uid

    functions.logger.log(':::::generateTags::v1:: ', uid, series, start, count)

    if (series < 1000) return { error: true, message: 'Invalid Series', errorField: 'series' }
    if (start < 1000) return { error: true, message: 'Invalid Start', errorField: 'start' }
    if (count < 1 || count > 100) return { error: true, message: 'Invalid Count', errorField: 'count' }
    if (!uid) return { error: true, message: 'Unauthorised 1', errorField: '' }
    if (uid !== 'lLZEzQfcFxM3l5LwWLpQKPjbRt13') return { error: true, message: 'Unauthorised 2', errorField: '' }

    const tagIdStart = getTagPattern(series, start)
    const tagIdEnd = getTagPattern(series, start + count)

    const tagsCollectionRef = db.collection('tags-test')
    let tagsRef = tagsCollectionRef.doc(tagIdStart)
    let tdoc = await tagsRef.get()

    if (tdoc.exists) {
      return { error: true, message: `${tagIdStart} - Tag exists!`, errorField: 'start' }
    }

    tagsRef = tagsCollectionRef.doc(tagIdEnd)
    tdoc = await tagsRef.get()

    if (tdoc.exists) {
      return { error: true, message: `${tagIdEnd} - Tag exists!`, errorField: 'count' }
    }

    const batch = db.batch()
    const keysCollectionRef = db.collection('keys-test')

    for (let i = 0; i < count; ++i) {
      const tid = getTagPattern(series, start + i)
      const newTagRef = tagsCollectionRef.doc(tid)
      const newTagData = {
        tid,
        status: TAG_STATUS_UNREGISTERED,
        type,
      }
      const newKeyRef = keysCollectionRef.doc(generateActivationKey())
      /* All DB Operations */
      batch.set(newTagRef, newTagData, { merge: true })
      batch.set(newKeyRef, { series })
    }
    const res = await batch.commit()

    functions.logger.log('Transaction finished: ', res)
    return { error: false, message: 'Activation completed!' }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err }
  }
}
