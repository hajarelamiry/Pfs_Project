if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/user/.gradle/caches/8.10.2/transforms/cbae6fd05b14449c109a4741a988337b/transformed/hermes-android-0.76.9-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/user/.gradle/caches/8.10.2/transforms/cbae6fd05b14449c109a4741a988337b/transformed/hermes-android-0.76.9-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

