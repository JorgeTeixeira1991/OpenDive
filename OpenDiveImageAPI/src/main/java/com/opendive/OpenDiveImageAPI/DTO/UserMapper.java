pmacOS/Linux: git clone https://github.com/NvChad/NvChad ~/.config/nvim --depth 1 && nvimackage com.opendive.OpenDiveImageAPI.DTO;



    @Mapper
    public interface UserMapper {

        UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

        UserDTO userToUserDto(User user);
    }



