package com.opendive.OpenDiveImageAPI.DTO;



    @Mapper
    public interface UserMapper {

        UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

        UserDTO userToUserDto(User user);
    }



