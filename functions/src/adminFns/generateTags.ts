/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { TAG_STATUS_UNREGISTERED } from '../global_constants'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

function getTagPattern(series: number, sequence: number) {
  return `${series}-${sequence}`
}
function getRandomInt(min = 1000, max = 9999) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function generateActivationKey() {
  return `${getRandomInt()}-${getRandomInt()}`
}

/**
 * generateTags
 */
export async function generateTags(
  data: any,
  context: any
): Promise<{ error: boolean; message: string; errorField?: string }> {
  try {
    const series = parseInt(data?.series)
    const start = parseInt(data?.start)
    const count = parseInt(data?.count)
    const type = data?.type || 'default'
    const uid = context.auth?.uid

    functions.logger.log(':::::generateTags::v2:: ', uid, series, start, count, type)

    if (series < 1000 || series > 9999) return { error: true, message: 'Invalid Series', errorField: 'series' }
    if (start < 1000 || start > 9999) return { error: true, message: 'Invalid Start', errorField: 'start' }
    if (count < 1 || count > 100) return { error: true, message: 'Invalid Count', errorField: 'count' }
    if (!uid) return { error: true, message: 'Unauthorised 1', errorField: '' }

    const usersRef = db.collection('users').doc(uid)
    const doc = await usersRef.get()
    if (!doc.exists) {
      return { error: true, message: 'Unauthorised 2', errorField: '' }
    }
    const userData = doc.data()
    if (!userData || userData.role !== 'admin') return { error: true, message: 'Unauthorised 3', errorField: '' }

    const tagIdStart = getTagPattern(series, start)
    const tagIdEnd = getTagPattern(series, start + count)

    const tagsCollectionRef = db.collection('tags')
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
    const keysCollectionRef = db.collection('keys')

    for (let i = 0; i < count; ++i) {
      const tid = getTagPattern(series, start + i)
      const newTagRef = tagsCollectionRef.doc(tid)
      const newTagData = {
        tid,
        status: TAG_STATUS_UNREGISTERED,
        type,
        createdOn: admin.firestore.FieldValue.serverTimestamp(),
      }
      const newKeyRef = keysCollectionRef.doc(generateActivationKey())
      const newKeyData = {
        series,
        type,
        createdOn: admin.firestore.FieldValue.serverTimestamp(),
      }
      /* All DB Operations */
      batch.set(newTagRef, newTagData, { merge: true })
      batch.set(newKeyRef, newKeyData)
    }
    const res = await batch.commit()

    functions.logger.log('Transaction finished: ', res)
    return { error: false, message: 'Activation completed!' }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err }
  }
}
