package pfs.project.myBus.Dto;

import pfs.project.myBus.Enums.Role;

public class DriverDto {
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Role role;
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
