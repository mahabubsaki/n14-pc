import envConfig from "@/configs/env.configs";
import axios from "axios";
import { toast } from "sonner";

export async function uploadImage(file) {
    try {
        const formData = new FormData();

        formData.append("image", file);

        const { data: { data: { url } } } = await axios.post(`https://api.imgbb.com/1/upload?key=${envConfig.imgbbApi}`, formData);
        return url;
    } catch (err) {
        toast.error(err.message);
    }
}