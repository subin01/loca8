import * as functions from 'firebase-functions'
import { createUserProfile, updateUserProfile, verifyTag } from './clientFunctions'
import { notifyTagOwner } from './clientFns/notifyTagOwner'

// Client Invoked functions
exports.createUserProfile = functions.region('asia-south1').https.onCall(createUserProfile)
exports.updateUserProfile = functions.region('asia-south1').https.onCall(updateUserProfile)
exports.verifyTag = functions.region('asia-south1').https.onCall(verifyTag)
exports.notifyTagOwner = functions.region('asia-south1').https.onCall(notifyTagOwner)
