package com.ImageDbApi.ImageApi.Service;

import com.ImageDbApi.ImageApi.Models.Image;
import com.ImageDbApi.ImageApi.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }
    public Image getImageById(Long id) {
        return imageRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }
    public boolean imgExists(Long id){
        return getImageById(id) != null;
    }
}
