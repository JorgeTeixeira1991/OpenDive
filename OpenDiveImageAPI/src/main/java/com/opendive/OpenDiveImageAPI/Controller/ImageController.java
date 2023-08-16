package com.opendive.OpenDiveImageAPI.Controller;

import com.opendive.OpenDiveImageAPI.Model.Image;
import com.opendive.OpenDiveImageAPI.Service.Image.ImageService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private EntityManager entityManager; // Injecting EntityManager to get Hibernate Session

    @GetMapping("/{id}")
    public ResponseEntity<Image> getImage(@PathVariable Long id) {
        try {
            Image img = imageService.getImg(id);
            return new ResponseEntity<>(img, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Image> uploadImage(@RequestParam("name") String name,
                                             @RequestParam("file") MultipartFile file) {
        try {
            Image img = new Image();
            img.setName(name);
            Blob blob = new SerialBlob(file.getBytes()); // Convert MultipartFile to Blob
            img.setContent(blob);
            imageService.uploadImg(img);
            return new ResponseEntity<>(img, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable Long id,
                                             @RequestParam("name") String name,
                                             @RequestParam("file") MultipartFile file) {
        try {
            Image updatedImage = new Image();
            updatedImage.setName(name);
            Blob blob = new SerialBlob(file.getBytes()); // Convert MultipartFile to Blob
            updatedImage.setContent(blob);
            imageService.changeImg(updatedImage, id);
            return new ResponseEntity<>(updatedImage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        try {
            imageService.deleteImg(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


