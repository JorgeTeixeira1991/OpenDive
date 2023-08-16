package com.opendive.OpenDiveImageAPI.Service.Image;

import com.opendive.OpenDiveImageAPI.Model.Image;
import com.opendive.OpenDiveImageAPI.Repository.ImageDao;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageDao imageDao;

    @Override
    public Image getImg(Long id) {
        return imageDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Image with ID " + id + " not found."));
    }

    @Override
    public void uploadImg(Image image) {
        imageDao.save(image);
    }

    @Override
    public void deleteImg(Long id) {
        imageDao.deleteById(id);
    }

    @Override
    public void changeImg(Image imageToUpload, Long id) {
        if (!imageDao.existsById(id)) {
            throw new EntityNotFoundException("Image with ID " + id + " not found.");
        }
        imageDao.save(imageToUpload);
    }
}
