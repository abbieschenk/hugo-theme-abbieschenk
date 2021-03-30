import * as params from '@params';

feather.replace();

const cl = cloudinary.Cloudinary.new({ cloud_name: params.cloudinaryAccount });
cl.responsive();