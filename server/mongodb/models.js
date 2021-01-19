import mongoose from 'mongoose'

import testSchema from './schemas'

export default mongoose.model('stormtrooper', testSchema)
