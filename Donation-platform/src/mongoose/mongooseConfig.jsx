import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://kushalkhune111:EbA005YAv3s50Fn1@donationplatform.44w6n.mongodb.net/';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;
