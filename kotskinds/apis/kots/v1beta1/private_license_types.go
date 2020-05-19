/*
Copyright 2019 Replicated, Inc..

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// PrivateLicenseSpec defines the desired state of PrivateLicenseSpec
type PrivateLicenseSpec struct {
	Endpoint     string                      `json:"endpoint"`
	Slug         string                      `json:"slug"`
	Entitlements map[string]EntitlementField `json:"entitlements,omitempty"`
}

// PrivateLicenseStatus defines the observed state of PrivateLicense
type PrivateLicenseStatus struct {
}

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
// PrivateLicense is the Schema for the private license API
// +k8s:openapi-gen=true
// +kubebuilder:subresource:status
type PrivateLicense struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PrivateLicenseSpec   `json:"spec,omitempty"`
	Status PrivateLicenseStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// PrivateLicenseList contains a list of PrivateLicenses
type PrivateLicenseList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []PrivateLicense `json:"items"`
}

func init() {
	SchemeBuilder.Register(&PrivateLicense{}, &PrivateLicenseList{})
}
