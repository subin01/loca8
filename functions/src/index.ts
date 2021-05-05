import * as functions from 'firebase-functions'
import { createUserProfile, updateUserProfile, verifyTag } from './clientFunctions'

// Client Invoked functions
exports.createUserProfile = functions.region('asia-south1').https.onCall(createUserProfile)
exports.updateUserProfile = functions.region('asia-south1').https.onCall(updateUserProfile)
exports.verifyTag = functions.region('asia-south1').https.onCall(verifyTag)
