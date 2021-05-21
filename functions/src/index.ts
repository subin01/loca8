import * as functions from 'firebase-functions'
import { createUserProfile, updateUserProfile } from './clientFns/userProfile'
import { notifyTagOwner } from './clientFns/notifyTagOwner'
import { verifyTag } from './clientFns/verifyTag'
import { generateTags } from './adminFns/generateTags'
import { listAllTags } from './adminFns/listTags'

// Client Invoked functions
exports.createUserProfile = functions.region('asia-south1').https.onCall(createUserProfile)
exports.updateUserProfile = functions.region('asia-south1').https.onCall(updateUserProfile)
exports.verifyTag = functions.region('asia-south1').https.onCall(verifyTag)
exports.notifyTagOwner = functions.region('asia-south1').https.onCall(notifyTagOwner)

// Admin Invoked functions
exports.generateTags = functions.region('asia-south1').https.onCall(generateTags)
exports.listAllTags = functions.region('asia-south1').https.onCall(listAllTags)
